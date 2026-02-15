//this is api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const API = axios.create({
  baseURL: "http://10.109.71.42:8000",
});

API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
