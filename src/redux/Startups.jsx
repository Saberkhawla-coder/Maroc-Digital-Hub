import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllStartups = createAsyncThunk('startups/fetchAll', async () => {
  const res = await axios.get('http://localhost:4000/Startup');
  return res.data;
});

export const addStartup = createAsyncThunk('startups/add', async (startup) => {
  const res = await axios.post('http://localhost:4000/Startup', startup);
  return res.data;
});

export const updateStartup = createAsyncThunk('startups/update', async ({ id, startup }) => {
  const res = await axios.put(`http://localhost:4000/Startup/${id}`, startup);
  return res.data;
});

export const deleteStartup = createAsyncThunk('startups/delete', async (id) => {
  await axios.delete(`http://localhost:4000/Startup/${id}`);
  return id; // retourne juste l'id pour filtrer dans le reducer
});

const StartupData = createSlice({
  name: "startups",
  initialState: {
    startup: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStartups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStartups.fulfilled, (state, action) => {
        state.loading = false;
        state.startup = action.payload;
      })
      .addCase(fetchAllStartups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addStartup.fulfilled, (state, action) => {
        state.startup.push(action.payload);
      })
      // Update
      .addCase(updateStartup.fulfilled, (state, action) => {
        const index = state.startup.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.startup[index] = action.payload;
      })
      // Delete
      .addCase(deleteStartup.fulfilled, (state, action) => {
        state.startup = state.startup.filter(s => s.id !== action.payload);
      });
  },
});

export default StartupData.reducer;
