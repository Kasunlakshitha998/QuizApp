import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import ForgotPassword from "./auth/ForgotPassword";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Home from "./pages/Home";
import DashboardHome from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import Profile from "./pages/Profile";


import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/authContext";
import Quizzes from "./pages/Quizzes";
import AttemptQuiz from "./pages/AttemptQuiz";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Routers for Auth */}

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          {/* Routes for User Dashboard Panel  */}
          <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/account" element={<Account />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/quiz/:quizId" element={<AttemptQuiz />} />
        </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
