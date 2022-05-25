import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalsReducer from "../features/goals/goalsSlice";
import questionReducer from "../features/ask-question/questionSlice";
import likeQuestionReducer from '../features/likeQuestion/likeQuestionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    questions: questionReducer,
    likeQuestion: likeQuestionReducer
  },
});
