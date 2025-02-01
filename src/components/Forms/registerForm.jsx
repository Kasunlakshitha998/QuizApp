import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import InputField from "./InputField";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if(formData.password == formData.confirmPassword){
        setError(false)

    }else{
        setError(true)
    
    }
    console.log("Login Data:", formData);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleLogin} 
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm sm:w-96"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Register</h1>

        {/* Email Input */}
        <InputField
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          name="email"
          required={true}
          value={formData.email}
          onChange={handleData}
          icon={MdEmail}
          iconColor="text-gray-500"
          borderColor="border-gray-300"
        />

        {/* Password Input */}
        <InputField
          label="Password"
          type="password"
          placeholder="********"
          name="password"
          required={true}
          value={formData.password}
          onChange={handleData}
          icon={RiLockPasswordLine}
          iconColor="text-gray-500"
          borderColor="border-gray-300"
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="********"
          name="confirmPassword"
          required={true}
          value={formData.confirmPassword}
          onChange={handleData}
          icon={RiLockPasswordLine}
          iconColor="text-gray-500"
          borderColor="border-gray-300"
        />

        {error && <p>password does not match</p>}

        {/* Login Button */}
        <button
          type="submit" 
          disabled={loading}
          className="bg-red-500 text-white font-semibold w-full py-2 mt-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 cursor-pointer"
        >
          Register
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Do you have an account? <span className="text-red-500 font-semibold cursor-pointer hover:underline"><Link to={'/login'} >Sign in</Link></span>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
