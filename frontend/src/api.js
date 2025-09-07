import axios from "axios";

// Point to your backend server
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;
