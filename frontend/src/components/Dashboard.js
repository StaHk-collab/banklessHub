import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../images/profile-pic.png"; // Profile picture
import loanImg from "../images/loan-placeholder.png"; // Placeholder for loans
import insuranceImg from "../images/insurance-placeholder.png"; // Placeholder for insurance
import savingsImg from "../images/savings-placeholder.png"; // Placeholder for savings

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle the dropdown visibility
  const dropdownRef = useRef(null); // Reference to the dropdown for closing when clicked outside
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  // Handle click outside of the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  // Toggle dropdown visibility on profile picture click
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Logout handler
  const handleLogout = () => {
    // Clear localStorage and navigate to login page
    localStorage.clear();
    navigate("/login");
  };

  React.useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <header className="bg-primary text-white d-flex justify-content-between align-items-center py-4 px-5">
        <h1>Welcome to your dashboard</h1>
        {/* Profile Section */}
        <div className="profile-section d-flex align-items-center position-relative">
          <img
            src={profilePic}
            alt="Profile"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
            onClick={toggleDropdown} // Toggle dropdown visibility on click
          />
          <p className="mb-0 fw-bold">Welcome, {userName}!</p>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              className="dropdown-menu position-absolute"
              ref={dropdownRef} // Reference to handle clicks outside
              style={{ top: "60px", right: "0", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
            >
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-5">
        <div className="row g-4">
          {/* Loan Section */}
          <div className="col-md-4 text-center">
            <h3>
              <a
                href="#"
                onClick={() => navigate("/loans")}
                className="text-decoration-none text-primary"
              >
                Apply for a Loan
              </a>
            </h3>
            <p className="text-muted">
              Manage your financial needs with ease and flexible repayment options.
            </p>
            <img
              src={loanImg}
              alt="Loan Placeholder"
              className="img-fluid rounded shadow"
              style={{ height: "150px", objectFit: "cover" }}
            />
          </div>

          {/* Insurance Section */}
          <div className="col-md-4 text-center">
            <h3>
              <a
                href="#"
                onClick={() => navigate("/insurance")}
                className="text-decoration-none text-success"
              >
                Enroll in Insurance
              </a>
            </h3>
            <p className="text-muted">
              Secure your future with trusted and reliable insurance plans.
            </p>
            <img
              src={insuranceImg}
              alt="Insurance Placeholder"
              className="img-fluid rounded shadow"
              style={{ height: "150px", objectFit: "cover" }}
            />
          </div>

          {/* Savings Section */}
          <div className="col-md-4 text-center">
            <h3>
              <a
                href="#"
                onClick={() => navigate("/savings")}
                className="text-decoration-none text-warning"
              >
                Create a Savings Account
              </a>
            </h3>
            <p className="text-muted">
              Start saving today for a brighter and more secure tomorrow.
            </p>
            <img
              src={savingsImg}
              alt="Savings Placeholder"
              className="img-fluid rounded shadow"
              style={{ height: "150px", objectFit: "cover" }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0" style={{ fontSize: "0.8rem" }}>© 2024 Bankless Hub. All rights reserved.</p>
        <p className="mb-0" style={{ fontSize: "0.8rem" }}>Contact us: support@banklesshub.com</p>
      </footer>
    </div>
  );
};

export default Dashboard;