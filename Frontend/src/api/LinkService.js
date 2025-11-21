import axios from "axios";

// const API_BASE_URL = "http://localhost:3000/api";
const BACKEND_API_URL = "https://url-shortner-frontend-oyr1.onrender.com";

export const creatrShortUrl = async (payload) => {
    console.log("DA",payload);
    
  return await axios.post(`${API_BASE_URL}/links`, payload);
};

export const getAllLinks = async () => {
  return await axios.get(`${API_BASE_URL}/links`);
};

export const getLinkStats = async (code) => {
  return await axios.get(`${API_BASE_URL}/links/${code}`);
};

export const deleteLink = async (code) => {
  return await axios.delete(`${API_BASE_URL}/links/${code}`);
};
