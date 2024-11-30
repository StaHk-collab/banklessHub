import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Loans from "./components/Loans";
import Insurance from "./components/Insurance";
import Savings from "./components/Savings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </Router>
  );
};

export default App;