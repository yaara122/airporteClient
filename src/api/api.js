// src/api/flightApi.js
import axios from "axios";
// import { userInfo } from "os";

// Use the environment variable, fallback to default if not set

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001",
});

/**
 * API client for flight-related endpoints.
 * Provides functions to interact with the backend flight API.
 */

export const postUsers = (user) => client.post("/users", user);
export const userLogin = (userInfo) => client.post("/users/login", userInfo);
export const userLogout = (data, token) => client.post("/users/logout",data, token);
// export const getUsersRequests = (userData) => client.get('/requests/user', { params: userData });
export const postRequest = (requestData, token) => client.post("/requests", requestData, token);
export const getRequests = () => client.get("/requests");
