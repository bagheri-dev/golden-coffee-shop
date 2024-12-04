import axios from "axios"

const token = localStorage.getItem("accessToken");

export const client = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
    headers : {
      Authorization: token ? `Bearer ${token}` : "",
    }
  });