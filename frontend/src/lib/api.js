import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const addPaper = (payload) => axios.post(`${API}/api/papers`, payload);
export const getPapersByAuthor = (author) =>
  axios.get(`${API}/api/papers`, { params: { author } });

export const getPapersByTopic = (topic) =>
  axios.get(`${API}/api/papers/topic/${encodeURIComponent(topic)}`);

export const getCollaborations = () =>
  axios.get(`${API}/api/collaborations`);

export const getBlockchainDatasets = () =>
  axios.get(`${API}/api/datasets/blockchain`);