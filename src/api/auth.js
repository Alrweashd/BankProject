import { Navigate, useNavigate } from "react-router-dom";
import instance from ".";
import jwt_decode from "jwt-decode";

const login = async (userInfo) => {
  try {
    const { data } = await instance.post("/auth/v3/login", userInfo);
    storeToken(data.access);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (userInfo) => {
  try {
    const formData = new FormData();
    for (const key in userInfo) formData.append(key, userInfo[key]);
    const { data } = await instance.post("/auth/v3/register", formData);
    storeToken(data.access);

    console.log(data.access);
    return data;
  } catch (error) {
    console.log("t", userInfo);
    if (error.response.data.details.password) {
      alert(
        "Password must at least 8 digits with a combination of numbers and letters"
      );
    }
  }
};

const me = async () => {
  try {
    const { data } = await instance.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
};

// const getAllUsers = async () => {
//   try {
//     const { data } = await instance.get("/auth/users");
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now()) {
      return false;
    }
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("token");
};

export { login, register, me, storeToken, checkToken, logout };
