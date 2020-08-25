import axios from "axios";

//COLOCAR O IP DO BACKEND
const ip = 'http://192.168.0.3';

const api = axios.create({
  baseURL: `${ip}:4000/`,
});

export default api;
