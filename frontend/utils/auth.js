import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../api/api";

export const login = async (email, password) => {
  const res = await API.post("/api/auth/login/", {
    username: email, // email used as username
    password,
  });

  await AsyncStorage.setItem("access", res.data.access);
};

export const signup = async (name, email, password) => {
  await API.post("/api/auth/register/", {
    name,
    email,
    password,
  });
};
