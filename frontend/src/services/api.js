import axios from "axios";

const ip = 'http://192.168.0.3';

const api = axios.create({
  baseURL: `${ip}:4000/`,
});

export default api;
