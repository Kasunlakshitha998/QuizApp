import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useAuth } from "../../auth/authContext";
import { fetchQuiz } from "../../utils/functions/fetchQuizById";
import Quiz from "./Quiz";

function AttemptQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const getQuiz = async () => {
    setLoading(true);
    const q = await fetchQuiz(quizId);
    setQuiz(q);
    setLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="mt-4 text-green-600 font-medium text-center animate-pulse">
            Loading Quiz...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 relative inline-block">
            <span className="relative z-10">{quiz?.topic} Quiz</span>
            <div className="absolute -bottom-1 left-0 right-0 h-2 bg-green-200 opacity-50 transform -skew-x-12"></div>
          </h1>
          <p className="text-base text-gray-600">
            Test your knowledge and challenge yourself!
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white backdrop-blur-lg bg-opacity-90 rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Quiz Header Banner */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Quiz Session</span>
              </div>
              <div className="text-sm opacity-75">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Quiz Content */}
          <div className="p-4">
            <Quiz quiz={quiz} quizId={quizId} currentUser={currentUser} />
          </div>

          {/* Quiz Footer */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Take your time</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Read carefully</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttemptQuiz;
