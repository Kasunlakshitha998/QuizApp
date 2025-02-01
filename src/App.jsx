import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Forms/loginForm";
import RegisterForm from "./components/Forms/registerForm";
import DashboardHome from "./pages/Dashboard";
import Home from "./pages/Home";
import CreateQuize from "./pages/CreateQuize";
import Reports from "./pages/Reports";
import Account from "./pages/Account";
import DashboardLayout from "./layouts/DashboardLayout";

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
    </Router>
  );
}

export default App;
