import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../auth/authContext";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const fetchUserQuizzes = async () => {
    if (!currentUser) return;

    try {
      setLoading(true); // Start loading
      const q = query(
        collection(db, "quizzes"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      const userQuizzes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuizzes(userQuizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchUserQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Your Quizzes
      </h1>

      {loading ? (
        // Loading Indicator
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
              <p className="text-gray-600">
                Marks: {quiz.marks || "Not Graded"}
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
    </div>
  );
}

export default Quizzes;
