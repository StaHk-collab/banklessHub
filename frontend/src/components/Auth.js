import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import '../custom.css'; // Import the custom CSS file for styling

const Auth = () => {
  const [userId, setUserId] = useState("");
  const [credentials, setCredentials] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(userId, credentials);
    setMessage(response.message);
    setTimeout(() => {
      if (response.authStatus) {
        navigate("/dashboard");
      } else {
        setError(response.message);
      }
    }, 2000);
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100">
      {/* BanklessHub Text in the Top Right Corner */}
      <div className="banklesshub-text">banklessHub</div>

      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              placeholder="Enter User Name"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default Auth;