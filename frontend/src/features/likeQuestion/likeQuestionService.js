import axios from "axios";

const API_URL = "/api/likes/";

// get all likes
const getLikes = async (likesData) => {
  const { questionId } = likesData;
  const response = await axios.get(API_URL + questionId);
  return response.data;
};

// update likes for a question
const updateLikes = async (likesData) => {
  const response = await axios.put(API_URL, likesData);
  return response.data;
};

const likeQuestionService = {
  getLikes,
  updateLikes,
};

export default likeQuestionService;
