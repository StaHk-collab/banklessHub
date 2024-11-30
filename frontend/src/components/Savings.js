import React, { useState } from "react";
import { createSavingsAccount } from "../services/financeService";

const Savings = () => {
  const [initialDeposit, setInitialDeposit] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateAccount = async () => {
    const response = await createSavingsAccount(initialDeposit);
    setMessage(response.message);
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Create a Savings Account</h2>
        <div className="mb-3">
          <label htmlFor="initialDeposit" className="form-label">Initial Deposit</label>
          <input
            type="number"
            className="form-control"
            id="initialDeposit"
            placeholder="Enter Initial Deposit"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
          />
        </div>
        <button className="btn btn-warning w-100" onClick={handleCreateAccount}>
          Create Account
        </button>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Savings;