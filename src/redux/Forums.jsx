import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchForum = createAsyncThunk(
  'forums/fetchForum',
  async () => {
    const res = await axios.get('http://localhost:4000/Forum');
    return res.data;
  }
);

const ForumData = createSlice({
  name: "forums",
  initialState: {
    forums: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForum.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForum.fulfilled, (state, action) => {
        state.loading = false;
        state.forums = action.payload;
      })
      .addCase(fetchForum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ForumData.reducer;
