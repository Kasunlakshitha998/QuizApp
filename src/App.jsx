import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import DashboardHome from "./pages/Dashboard";
import Home from "./pages/Home";
import CreateQuize from "./pages/CreateQuize";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Routers for Auth */}

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Routes for User Dashboard Panel  */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/create-quiz" element={<CreateQuize/>} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/account" element={<Account />} />
        </Route>
        
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
