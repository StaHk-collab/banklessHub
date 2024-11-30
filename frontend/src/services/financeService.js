import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const userName = localStorage.getItem("userName");

export const applyForLoan = async (loanAmount, tenure) => {
  const response = await axios.post(`${API_BASE_URL}/loans/apply`, {
    loan_amount: loanAmount,
    tenure,
    user_id: userName
  });
  return response.data;
};

export const enrollInInsurance = async (insurancePlan) => {
  const response = await axios.post(`${API_BASE_URL}/insurance/enroll`, {
    insurance_plan: insurancePlan,
    user_id: userName
  });
  return response.data;
};

export const createSavingsAccount = async (initialDeposit) => {
  const response = await axios.post(`${API_BASE_URL}/savings/create`, {
    initial_deposit: initialDeposit,
    user_id: userName
  });
  return response.data;
};