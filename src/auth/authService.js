import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../config/Firebase";

//Register function
export const registerUser = async (formData) => {
  console.log("form data", formData);

  //register user with fire base
  try {
    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = auth.currentUser;

    // Store user data in Firestore
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      toast.success("Registered Successfully", { position: "top-center" });
      console.log("User Registered", user);
      return user;
    }
  } catch (error) {
    console.log("Error Registering User", error.message);
    toast.error(`Registration failed: ${error.message}`, {
      position: "top-center",
    });
  }
};

// Login function
export const loginUser = async (formData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    console.log("User logged in successfully:", userCredential.user);
    return userCredential.user
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed", { position: "top-center" });
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
