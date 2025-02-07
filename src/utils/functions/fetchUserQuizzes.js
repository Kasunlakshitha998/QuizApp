import { collection, query, where, getDocs} from "firebase/firestore";
import { db } from "../../config/Firebase";

export   const fetchUserQuizzes = async (currentUser) => {
    if (!currentUser) return;

    try {
      
      const q = query(
        collection(db, "quizzes"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const userQuizzes = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()); // Newest first

      return userQuizzes;
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } 
  };