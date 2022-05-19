import axios from "axios";

const API_URL = "/api/users/";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  const data = response.data;

  // if (response.data) {
  //   localStorage.setItem("token", data.token);
  //   delete data["token"];

  //   localStorage.setItem("user", JSON.stringify(data));
  // }

  // console.log(data, 'data from authservice')

  return data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  const data = response.data;

  if (response.data) {
    localStorage.setItem("token", data.token);
    delete data["token"];
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

// Update user profile
const updateMe = async (userProfile, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, userProfile, config);

  return response.data;
};

// getting username for the question/answer
const getUser = async (userId) => {
  const response = await axios.get(API_URL + userId);
  return response.data;
};

const authService = {
  register,
  login,
  updateMe,
  getUser,
};

export default authService;
