import React, { useState } from "react";
import { useAuth } from "../auth/authContext"; // Import authentication context
import { auth, db } from "../config/Firebase"; // Firebase config
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Profile() {
  const { currentUser, logout } = useAuth();
  const [fullName, setFullName] = useState(currentUser?.displayName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update user profile in Firestore (assuming you store user details)
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { fullName });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">Profile</h2>

      {/* Profile Picture */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-white">
          {currentUser?.email?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            value={email}
            disabled
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-md hover:bg-primary-dark transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
