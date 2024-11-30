import axios from "axios";

// Base URL of the backend API (this should be configured in .env)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to handle user login
export const login = async (userId, credentials) => {
  try {
    localStorage.setItem("userName", userId);
    // Make POST request to the backend to authenticate user
    // const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    //   user_id: userId,
    //   credentials,
    // });

    // Mock response
    const response = {
      authStatus: true,
      data: {
        authToken: "mocked_token",
        message: "Authentication successful",
      },
    };

    // If authentication is successful, store the token (if returned)
    if (response.data.authToken) {
      localStorage.setItem("authToken", response.data.authToken);
      return { authToken: response.data.authToken, authStatus: true, message: "Authentication successful" };
    } else {
      return { error: "Authentication failed", message: response.data.error || "Unknown error" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed", message: error.message };
  }
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return token ? true : false;
};

// Function to log the user out
export const logout = () => {
  localStorage.removeItem("authToken");
};