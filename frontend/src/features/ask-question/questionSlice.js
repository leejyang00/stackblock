import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "../ask-question/questionService";

const initialState = {
  questions: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// only getting questions submitted by users
export const getUserQuestion = createAsyncThunk(
  "/question/getUserAll",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      return await questionService.getUserQuestion(token);
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// submit a new question from 'Ask a Question' page
export const submitQuestion = createAsyncThunk(
  "/question/submit",
  async (questionData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      return await questionService.submitQuestion(questionData, token);
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// retrieve ALL questions asked 
// - perhaps the first 10 questions
export const getAllQuestions = createAsyncThunk(
  "/question/getAllQuestions",
  async (_, thunkAPI) => {
    try {
      return await questionService.getAllQuestions();
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Question Slice
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    reset: (state) => initialState,
    upVote: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitQuestion.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // state.questions.push(action.payload);
      })
      .addCase(submitQuestion.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        console.log(action.payload, 'payload')
        // settle to give one question each time

        state.questions.push(action.payload)
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
  },
});

export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
