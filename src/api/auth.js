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

    return data;
  } catch (error) {
    if (error.response.data.details?.password.includes("/[a-zA-Z0-9]{8,30}/")) {
      alert(
        "Password must at least 8 digits with a combination of numbers and letters"
      );
    }
    if (error.response.data.message?.includes("E11000 duplicate key error")) {
      alert("Username already exists, please use another username");
    }
  }
};

const me = async () => {
  try {
    const { data } = await instance.get("/auth/v3/profile");

    return data;
  } catch (error) {
    console.log(error);
  }
};

const balance = async () => {
  try {
    const { data } = await instance.get("/bank/v3/balance");

    return data.balance;
  } catch (error) {
    console.log(error);
  }
};

const transactions = async () => {
  try {
    const { data } = await instance.get("/auth/v3/transactions");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deposit = async () => {
  try {
    const { data } = await instance.post("/auth/v3/deposit");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async () => {
  try {
    const { data } = await instance.get("/auth/v3/users");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    const cureentTime = Date.now() / 1000;
    if (decoded.exp < cureentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("token");
};

export {
  login,
  register,
  me,
  storeToken,
  checkToken,
  logout,
  balance,
  transactions,
  getUsers,
  deposit,
};
