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

export const getQuestion = createAsyncThunk(
  "/question/getQuestion",
  async (questionData, thunkAPI) => {
    try {
      return await questionService.getQuestion(questionData);
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
        state.questions.push(action.payload);
      })
      .addCase(submitQuestion.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = questionSlice.actions;
export default questionSlice.reducer;
