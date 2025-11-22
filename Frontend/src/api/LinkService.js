import axios from "axios";

// const API_BASE_URL = "http://localhost:3000/api";
const BACKEND_API_URL = "https://url-shortner-swbt.onrender.com/api";

export const creatrShortUrl = async (payload) => {
  return await axios.post(`${BACKEND_API_URL}/links`, payload);
};

export const getAllLinks = async () => {
  return await axios.get(`${BACKEND_API_URL}/links`);
};

export const getLinkStats = async (code) => {
  return await axios.get(`${BACKEND_API_URL}/links/${code}`);
};

export const deleteLink = async (code) => {
  return await axios.delete(`${BACKEND_API_URL}/links/${code}`);
};

export const RedirectAPI = async () => {
  return await axios.get(`${BACKEND_API_URL}/:id`)
}