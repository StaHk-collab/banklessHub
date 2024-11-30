import React, { useState } from "react";
import { applyForLoan } from "../services/financeService";

const Loans = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [message, setMessage] = useState("");

  const handleApplyLoan = async () => {
    const response = await applyForLoan(loanAmount, tenure);
    setMessage(response.message);
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Apply for a Loan</h2>
        <div className="mb-3">
          <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
          <input
            type="number"
            className="form-control"
            id="loanAmount"
            placeholder="Enter Loan Amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tenure" className="form-label">Tenure (months)</label>
          <input
            type="number"
            className="form-control"
            id="tenure"
            placeholder="Enter Tenure"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleApplyLoan}>
          Submit
        </button>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Loans;