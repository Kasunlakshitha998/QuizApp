import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import InputField from "../UI/InputField";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import { registerUser } from "../../auth/authService";
import { validatePassword } from "../../utils/validation/validatePassword";

const pError =
  "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Validate the password pattern using the external function
    if (!validatePassword(formData.password)) {
      console.log(pError);
      toast.error(pError, { position: "top-center" });
      setError(true);
      setLoading(false);
      return;
    }

    // Then validate that password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      toast.error("Passwords do not match", { position: "top-center" });
      setError(true);
      setLoading(false);
      return;
    }

    // Attempt registration
    try {
      const user = await registerUser(formData);
      if (user) {
        navigate("/login");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Optionally, provide user feedback here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm sm:w-96"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Register
        </h1>

        {/* Name Input */}
        <InputField
          label="Name"
          type="text"
          placeholder="John Doe"
          name="fullName"
          required={true}
          value={formData.fullName}
          onChange={handleData}
          icon={User}
          iconColor="text-gray-500"
          borderColor="border-gray-300"
        />

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

        {error && <p className="text-red-700">Password Does Not Match...</p>}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white font-semibold w-full py-2 mt-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 cursor-pointer"
        >
          Register
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Do you have an account?{" "}
          <span className="text-green-500 font-semibold cursor-pointer hover:underline">
            <Link to={"/login"}>Sign in</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
