import axios from "axios";

const API_URL = "/api/answers/";

// submit answer from questionProfile
const submitAnswer = async (token, answerData) => {
  const config = {
    headers: {
      AUthorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, answerData, config);
  return response.data;
};

// get all answers for this question
const getAllAnswers = async(questionId) => {

  const response = await axios.get(API_URL + questionId)
  return response.data
}

const answerService = {
  submitAnswer,
  getAllAnswers
};

export default answerService;
