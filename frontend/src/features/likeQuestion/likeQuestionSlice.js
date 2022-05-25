import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import likeQuestionService from "./likeQuestionService";

const initialState = {
  question: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getLikes = createAsyncThunk(
  "likes/getLikes",
  async (likesData, thunkAPI) => {
    try {
      return await likeQuestionService.getLikes(likesData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateLikes = createAsyncThunk(
  "likes/updateLikes",
  async (likesData, thunkAPI) => {
    try {
      return await likeQuestionService.updateLikes(likesData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeQuestionSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    resetQuestionLikes: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.question = action.payload;
      })
      .addCase(getLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.question = action.payload;
      })
      .addCase(updateLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetQuestionLikes } = likeQuestionSlice.actions;
export default likeQuestionSlice.reducer;
