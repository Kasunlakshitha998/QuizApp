import React, { useState } from "react";
import InputField from "../UI/InputField";
import { MdNumbers, MdTopic } from "react-icons/md";
import { generateContent } from "../../utils/functions/generateContent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
import { toast } from "react-toastify";


function CreateQuizForm({setIsModalOpen}) {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "topic") setTopic(value);
    if (name === "numQuestions") setNumQuestions(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!topic.trim() || numQuestions <= 0) {
      setError("Please enter a valid topic and number of questions.");
      toast.error("Please enter a valid topic and number of questions.")
      return;
    }
    await generateContent(topic, numQuestions, currentUser);   
    setLoading(false);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm sm:w-96"
      >
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create Quiz
        </h1>

        {/* Topic Input */}
        <InputField
          label="Enter Topic"
          type="text"
          placeholder="Enter a topic (e.g., Science, History)"
          name="topic"
          required
          value={topic}
          onChange={handleChange}
          icon={MdTopic}
          iconColor="text-gray-500"
          borderColor="border-gray-300"
        />

        {/* Number of Questions Input */}
        <InputField
          label="Number of Questions"
          type="number"
          placeholder="Enter number of questions"
          name="numQuestions"
          required
          value={numQuestions}
          onChange={handleChange}
          icon={MdNumbers}
          iconColor="text-gray-500"
          borderColor="border-gray-300"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Get Quiz Button */}
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold w-full py-2 mt-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 cursor-pointer"
        >
          Get Quiz
        </button>
      </form>
    </div>
  );
}

export default CreateQuizForm;
