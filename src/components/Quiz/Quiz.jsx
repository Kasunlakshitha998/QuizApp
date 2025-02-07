import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveQuizResult } from "../../utils/functions/addMarksToUserProfile";

function Quiz({ quiz, quizId, currentUser }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const quizLength = quiz.questions.length - 1;

  const handleAnswer = (selectedAnswer) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: selectedAnswer });
  };

  const handleNext = () => {
    if (currentQuestion < quizLength) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    let correctCount = 0;
    quiz.questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    await saveQuizResult(quizId, correctCount, quiz, currentUser);

    setMarks(correctCount);

    setLoading(false);
  };

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
    <>
      {marks === null ? (
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5">
          {/* Progress bar */}
          <div className="mb-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-500 to-red-300 h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${
                  ((currentQuestion + 1) / quiz.questions.length) * 100
                }%`,
              }}
            ></div>
          </div>

          {/* Question card */}
          <div className="mb-6 p-4 bg-white shadow-sm rounded-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 text-sm font-bold text-white bg-green-600 rounded-full">
                {currentQuestion + 1}
              </span>
              <h2 className="text-lg font-bold text-gray-800 flex-1">
                {quiz.questions[currentQuestion].question}
              </h2>
            </div>
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
          </div>

          {/* Answer options */}
          <div className="grid gap-3 mb-6">
            {quiz.questions[currentQuestion].answers.map((ans, index) => (
              <button
                onClick={() => handleAnswer(ans)}
                key={index}
                className="w-full p-3 text-left bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:border-green-500 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 text-sm border-2 border-gray-300 rounded-full">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {ans}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            {currentQuestion > 0 ? (
              <button
                className="px-4 py-2 flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200"
                onClick={handlePrevious}
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentQuestion === quizLength ? (
              <button
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                onClick={handleFinish}
              >
                Finish Quiz
              </button>
            ) : (
              <button
                className="px-4 py-2 flex items-center gap-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ml-auto"
                onClick={handleNext}
              >
                Next
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      ) : (
        // Resualt
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800">Quiz Results</h2>
          <p className="mt-2 text-lg">
            You scored <span className="font-bold text-green-600">{marks}</span>{" "}
            / {quiz?.questions?.length}
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
            onClick={() => navigate("/quizzes")}
            className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Back to Quizzes
          </button>
        </div>
      )}
    </>
  );
}

export default Quiz;
