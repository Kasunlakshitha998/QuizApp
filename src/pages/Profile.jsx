import React, { useState, useRef, useEffect } from "react";
import { 
  User, 
  Lock, 
  Camera, 
  Save, 
  LogOut, 
  Edit, 
  ImagePlus, 
  AlertTriangle,
  Calendar,
  MapPin,
  Briefcase
} from "lucide-react";
import { useAuth } from "../auth/authContext";
import { db } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

function Profile() {
  const { currentUser, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    phone: "",
    bio: "",
    profilePic: "",
    joinDate: null,
    location: "",
    occupation: ""
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch user details from Firestore
  const fetchUserDetails = async () => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          fullName: data.fullName || currentUser.displayName || "",
          phone: data.phone || "",
          bio: data.bio || "",
          profilePic: data.photoURL || currentUser.photoURL || "",
          joinDate: data.createdAt?.toDate() || null,
          location: data.location || "",
          occupation: data.occupation || ""
        });
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prev => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        fullName: userData.fullName,
        phone: userData.phone,
        bio: userData.bio,
        photoURL: userData.profilePic,
        location: userData.location,
        occupation: userData.occupation
      });

      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!password) return toast.error("Enter a new password!");

    try {
      await updatePassword(currentUser, password);
      toast.success("Password updated!");
      setPassword("");
    } catch (error) {
      toast.error("Failed to update password.");
    }
  };

  return (
    <div className="max-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          {!editMode ? (
            <button 
              onClick={() => setEditMode(true)} 
              className="text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <Edit size={24} />
            </button>
          ) : (
            <button 
              onClick={() => setEditMode(false)} 
              className="text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <AlertTriangle size={24} />
            </button>
          )}
        </div>

        {/* Profile Picture */}
        <div className="relative flex justify-center py-6">
          <div className="relative">
            <img
              src={userData.profilePic || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {editMode && (
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition"
              >
                <Camera size={20} />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </div>
        </div>

        {/* Profile Details */}
        <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
          <div className="space-y-4">
            {editMode ? (
              <>
                {/* Edit Mode Inputs */}
                <div className="flex items-center space-x-2">
                  <User className="text-gray-500" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={userData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-500" />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={userData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="text-gray-500" />
                  <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                    value={userData.occupation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <ImagePlus className="text-gray-500" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Edit className="text-gray-500" />
                  <textarea
                    name="bio"
                    placeholder="Bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  ></textarea>
                </div>
              </>
            ) : (
              <>
                {/* View Mode Details */}
                <div className="flex items-center space-x-2">
                  <User className="text-gray-500" />
                  <p className="w-full text-gray-700">{userData.fullName || "N/A"}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-500" />
                  <p className="w-full text-gray-700">{userData.location || "N/A"}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="text-gray-500" />
                  <p className="w-full text-gray-700">{userData.occupation || "N/A"}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <ImagePlus className="text-gray-500" />
                  <p className="w-full text-gray-700">{userData.phone || "N/A"}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Edit className="text-gray-500" />
                  <p className="w-full text-gray-700">{userData.bio || "No bio"}</p>
                </div>
                {userData.joinDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-gray-500" />
                    <p className="w-full text-gray-700">
                      Joined: {userData.joinDate.toLocaleDateString()}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {editMode && (
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
            >
              <Save className="mr-2" /> {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </form>

        {/* Rest of the component remains the same as previous version */}
        {/* (Password update and logout buttons) */}
      </div>
    </div>
  );
}

export default Profile;