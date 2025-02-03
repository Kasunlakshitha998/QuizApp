import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useAuth } from "../auth/authContext";

function AttemptQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const docRef = doc(db, "quizzes", quizId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setQuiz(docSnap.data());
        } else {
          console.error("No quiz found");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (selectedAnswer) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: selectedAnswer });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    quiz.questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);

    // Save score to Firestore
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      try {
        await updateDoc(userRef, {
          quizResults: arrayUnion({
            quizId: quizId,
            score: correctCount,
            totalQuestions: quiz.questions.length,
            timestamp: new Date(),
          }),
        });
      } catch (error) {
        console.error("Error saving results:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {quiz?.topic} Quiz
      </h1>

      <div className="flex justify-between items-center mb-4">
        <p className="text-lg text-gray-700">Time Left: {timeLeft}s</p>
      </div>

      {score === null ? (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <p className="font-semibold text-gray-800">
            {currentQuestion + 1}. {quiz?.questions[currentQuestion]?.question}
          </p>

          <div className="mt-2">
            {quiz?.questions[currentQuestion]?.answers.map((answer, i) => (
              <label
                key={i}
                className={`block cursor-pointer p-2 rounded-lg transition-all ${
                  userAnswers[currentQuestion] === answer
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                } hover:bg-blue-300`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={answer}
                  className="hidden"
                  onChange={() => handleAnswerSelect(answer)}
                />
                {answer}
              </label>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
            >
              Previous
            </button>
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800">Quiz Results</h2>
          <p className="mt-2 text-lg">
            You scored{" "}
            <span className="font-bold text-green-600">{score}</span> /{" "}
            {quiz?.questions?.length}
          </p>

          <div className="mt-4 text-left">
            {quiz?.questions?.map((q, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <p className="font-semibold">{q.question}</p>
                <p
                  className={`mt-1 ${
                    userAnswers[index] === q.correctAnswer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Your Answer: {userAnswers[index]}
                </p>
                <p className="text-gray-600">
                  Correct Answer:{" "}
                  <span className="font-bold">{q.correctAnswer}</span>
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default AttemptQuiz;
