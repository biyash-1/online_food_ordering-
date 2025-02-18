import axios from "axios";
import { refreshAccessToken } from "../stores/authStore"; 

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        await refreshAccessToken(); 
        
        return api.request(error.config);
      } catch (refreshError) {
        
        console.error("Refresh token failed", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
