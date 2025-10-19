import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

// CRUD
export const addPaper = (payload) => axios.post(`${API}/api/papers`, payload);

// Search
export const getPapersByAuthor = (author) =>
  axios.get(`${API}/api/papers`, { params: { author } });
export const getPapersByTopic = (topic) =>
  axios.get(`${API}/api/papers/topic/${encodeURIComponent(topic)}`);
export const getPapersByInstitution = (institution) =>
  axios.get(`${API}/api/papers/institution/${encodeURIComponent(institution)}`);
export const getPapersByPublisher = (publisher) =>
  axios.get(`${API}/api/papers/publisher/${encodeURIComponent(publisher)}`);
export const getPapersByContainer = (container) =>
  axios.get(`${API}/api/papers/container/${encodeURIComponent(container)}`);

// Autocomplete
export const suggestAuthors = (q) =>
  axios.get(`${API}/api/suggest/authors?q=${encodeURIComponent(q)}`);
export const suggestTopics = (q) =>
  axios.get(`${API}/api/suggest/topics?q=${encodeURIComponent(q)}`);
export const suggestInstitutions = (q) =>
  axios.get(`${API}/api/suggest/institutions?q=${encodeURIComponent(q)}`);
export const suggestPublishers = (q) =>
  axios.get(`${API}/api/suggest/publishers?q=${encodeURIComponent(q)}`);
