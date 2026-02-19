// src/api/flightApi.js
import axios from 'axios';

// Use the environment variable, fallback to default if not set
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1'
});

/**
 * API client for flight-related endpoints.
 * Provides functions to interact with the backend flight API.
 */

// export const getUsers = () => client.get('/users');
export const postUsers = (user) => client.post('/users', user);
export const userLogin = (userInfo) => client.post('/users/login', userInfo);
