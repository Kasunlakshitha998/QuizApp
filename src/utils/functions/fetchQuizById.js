import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

export const fetchQuiz = async (quizId) => {
  try {
    const docRef = doc(db, "quizzes", quizId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const q = docSnap.data();
      return q;
    } else {
      console.error("No quiz found");
    }
  } catch (error) {
    console.error("Error fetching quiz:", error);
  }
};
