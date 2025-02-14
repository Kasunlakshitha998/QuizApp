import React, { useState } from "react";

const quizzes = [
  { id: 1, title: "Math Quiz", category: "Math" },
  { id: 2, title: "Science Quiz", category: "Science" },
  { id: 3, title: "History Quiz", category: "History" },
  { id: 4, title: "Geography Quiz", category: "Geography" },
];

const categories = ["All", "Math", "Science", "History", "Geography"];

function DashboardHome() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userQuizzes, setUserQuizzes] = useState([]);

  const filteredQuizzes =
    selectedCategory === "All"
      ? quizzes
      : quizzes.filter((quiz) => quiz.category === selectedCategory);

  const addToUserList = (quiz) => {
    if (!userQuizzes.some((q) => q.id === quiz.id)) {
      setUserQuizzes([...userQuizzes, quiz]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6">Welcome to your Dashboard</h2>
      <p className="text-lg text-gray-700 mb-6">
        Browse quizzes by category and add them to your list.
      </p>
      
      <div className="mb-6">
        <label className="font-semibold text-lg">Filter by Category: </label>
        <select
          className="ml-2 p-2 border rounded shadow-md bg-white"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="p-6 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
            <p className="text-gray-600 mt-2">Category: {quiz.category}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => addToUserList(quiz)}
            >
              Add to My List
            </button>
          </div>
        ))}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mt-8">My Quiz List</h3>
      <ul className="list-disc pl-6 text-lg text-gray-700">
        {userQuizzes.map((quiz) => (
          <li key={quiz.id} className="mt-2">{quiz.title} ({quiz.category})</li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardHome;