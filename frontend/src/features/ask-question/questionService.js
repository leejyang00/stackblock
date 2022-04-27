import axios from "axios";

const API_URL = "/api/questions/";

// user submitting question to backend
const submitQuestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, questionData, config);
  return response.data;
};

// getting questions asked by users
const getUserQuestion = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// get all questions for home page
const getAllQuestions = async () => {
  const response = await axios.get(API_URL + "all")
  return response.data
}

// getting specific question with questionID from URL parameter
const getQuestion = async(questionId) => {
  const response = await axios.get(API_URL + questionId);
  return response.data
}

const questionService = {
  submitQuestion,
  getUserQuestion,
  getQuestion,
  getAllQuestions
};

export default questionService;
