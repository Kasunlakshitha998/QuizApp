import { db } from "../../config/Firebase";
import { collection, addDoc } from "firebase/firestore";

export const generateContent = async (topic, numQuestions, currentUser) => {
  

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
      return;
    }

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
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
};
