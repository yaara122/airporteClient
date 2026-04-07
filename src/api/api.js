import axios from "axios";

// Use the environment variable, fallback to default if not set
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001",
});

/**
 * API client for airport-related endpoints.
 * Provides functions to interact with the backend requests and users API.
 */

export const postUsers = (user) => client.post("/users", user);
export const userLogin = (userInfo) => client.post("/users/login", userInfo);
export const userLogout = (config) =>
  client.post("/users/logout", null, config);

export const postRequest = (newItem, headers) =>
  client.post("/requests", newItem, headers);
export const getUserRequests = (headers) => client.get("/requests", headers);
//admin authorization
export const getAllRequestsAdmin = (headers) =>
  client.get("/requests/getAllRequestsAdmin", headers);
export const setRequestStatus = (updateRequestData, headers) =>
  client.patch("/requests/setStatus", updateRequestData, headers);
