import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import CreateQuizForm from "../components/forms/CreateQuizForm";
import { fetchUserQuizzes } from "../utils/functions/fetchUserQuizzes";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    setLoading(true);
    if (!currentUser) return;

    try {
      const q = await fetchUserQuizzes(currentUser);
      setQuizzes(q);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [isModalOpen]);

  return (
    <div className="max-h-screen bg-gray-200 p-6 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Quizzes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          + Create Quiz
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : quizzes.length === 0 ? (
        <p className="text-center text-gray-600">
          No quizzes found. Create one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {quiz.topic}
              </h2>
              <p className="text-gray-600 mt-2">
                Status: {quiz.status || "Pending"}
              </p>
              <button
                onClick={() => navigate(`/quiz/${quiz.id}`)}
                className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Attempt Quiz
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Quiz Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-xs transition-opacity">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-900"
            >
              ✖
            </button>

            {/* Create Quiz Form */}
            <CreateQuizForm setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Quizzes;
