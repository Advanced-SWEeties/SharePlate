// src/utils/api.js or wherever you define the API logic

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return await response.json();
};
