import React, { useState } from "react";
import { enrollInInsurance } from "../services/financeService";

const Insurance = () => {
  const [insurancePlan, setInsurancePlan] = useState("");
  const [message, setMessage] = useState("");

  const handleEnroll = async () => {
    const response = await enrollInInsurance(insurancePlan);
    setMessage(response.message);
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Enroll in Insurance</h2>
        <div className="mb-3">
          <label htmlFor="insurancePlan" className="form-label">Insurance Plan</label>
          <input
            type="text"
            className="form-control"
            id="insurancePlan"
            placeholder="Enter Insurance Plan"
            value={insurancePlan}
            onChange={(e) => setInsurancePlan(e.target.value)}
          />
        </div>
        <button className="btn btn-success w-100" onClick={handleEnroll}>
          Enroll
        </button>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Insurance;