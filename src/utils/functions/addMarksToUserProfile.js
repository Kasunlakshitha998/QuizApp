import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/Firebase";

export const saveQuizResult = async (quizId, correctCount, quiz, currentUser) => {
  if (!currentUser) return;

  const userRef = doc(db, "users", currentUser.uid);

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const existingResults = userData.quizResults || [];

      // Check if quizId already exists in quizResults
      const quizIndex = existingResults.findIndex((result) => result.quizId === quizId);

      if (quizIndex !== -1) {
        // If quizId exists, update the existing entry
        existingResults[quizIndex] = {
          ...existingResults[quizIndex],
          marks: correctCount,
          totalQuestions: quiz.questions.length,
          timestamp: new Date(),
        };
      } else {
        // If quizId doesn't exist, add a new entry
        existingResults.push({
          quizId: quizId,
          marks: correctCount,
          totalQuestions: quiz.questions.length,
          timestamp: new Date(),
        });
      }

      // Update Firestore with the modified array
      await updateDoc(userRef, {
        quizResults: existingResults,
      });

      console.log("Marks updated in profile");
    }
  } catch (error) {
    console.error("Error saving results:", error);
  }
};
