import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import InputField from "../UI/InputField";
import { RiLockPasswordLine } from "react-icons/ri";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../auth/authContext";
import { db } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";

function CreateQuizForm() {
  // State for topic and number of questions
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState();
  const [quizData, setQuizData] = useState(null);
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

  const generateContent = async () => {
    setLoading(true);
    // Gemini API endpoint

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `Create a quiz about the ${topic} with ${numQuestions} questions. Each question should have four multiple-choice answers, with one correct answer and three incorrect answers. Indicate the correct answer for each question. Return the results in structured as an array of objects. Each object should have the following properties: "question" (the question text), "answers" (an array of four answer options), and "correctAnswer" (the correct answer as a string - must be one of the strings from the "answers" array).`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorData}`
        );
      }

      const data = await response.json();
      let quizText = data.candidates[0].content.parts[0].text.trim();

      // Remove markdown fences if they exist
      quizText = quizText
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();

      let parsedQuiz;
      try {
        parsedQuiz = JSON.parse(quizText);
      } catch (parseError) {
        console.error("Failed to parse quiz JSON:", parseError);
        setError("Failed to parse quiz data");
        return;
      }

      setQuizData(parsedQuiz);
      setError(null);
      console.log(parsedQuiz);

      // Store the quiz in Firestore under the logged-in user's ID
      const quizRef = collection(db, "quizzes");
      await addDoc(quizRef, {
        userId: currentUser.uid, // Store user ID
        topic,
        numQuestions,
        questions: parsedQuiz,
        status: "Not Attempted",
        marks: null,
        createdAt: new Date(),
      });

      console.log("Quiz saved to Firestore!");
      setLoading(false);
      navigate("/quizzes");
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || numQuestions <= 0) {
      setError("Please enter a valid topic and number of questions.");
      return;
    }
    generateContent();
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
          icon={MdEmail}
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
          icon={RiLockPasswordLine}
          iconColor="text-gray-500"
          borderColor="border-gray-300"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Get Quiz Button */}
        <button
          type="submit"
          className="bg-red-500 text-white font-semibold w-full py-2 mt-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 cursor-pointer"
        >
          Get Quiz
        </button>
      </form>
    </div>
  );
}

export default CreateQuizForm;
