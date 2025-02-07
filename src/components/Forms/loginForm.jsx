import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import InputField from "../UI/InputField";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../auth/authService";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    const user = await loginUser(formData);

    if (user) {
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm sm:w-96"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h1>

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

        {/* Forgot Password */}
        <div className="text-right text-sm text-gray-500 hover:text-red-500 cursor-pointer mt-2">
          <Link to={"/forgotPassword"}>Forgot password?</Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white font-semibold w-full py-2 mt-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 cursor-pointer"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <span className="text-green-500 font-semibold cursor-pointer hover:underline">
            <Link to={"/register"}>Sign up</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
