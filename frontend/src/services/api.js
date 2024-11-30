import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (userId, credentials) => {
  localStorage.setItem("userName", userId);
  // const response = await axios.post(`${API_BASE_URL}/auth/login`, {
  //   user_id: userId,
  //   credentials,
  // });
  // return response.data;
  return {
    authStatus: true,  // simulating a successful login
    authToken: "mocked_token",  // Mocking the authToken
    message: "Authentication successful",  // message
  };
};