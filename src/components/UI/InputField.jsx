import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputField({ label, type, placeholder, name, required, value, onChange, icon: Icon, iconColor, borderColor }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <div className={`flex items-center border px-4 py-2 rounded-lg ${borderColor} bg-gray-50`}>
        {/* Left Icon (Email/Password) */}
        {Icon && <Icon className={`w-5 h-5 ${iconColor} mr-2`} />}

        {/* Input Field */}
        <input
          type={type === "password" && !showPassword ? "password" : "text"} 
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border-none w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />

        {/* Password Toggle Icon (Only for Password Fields) */}
        {type === "password" && (
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className="focus:outline-none cursor-pointer"
          >
            {showPassword ? <FaEyeSlash className="text-gray-500 w-5 h-5 cursor-pointer" /> : <FaEye className="text-gray-500 w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
