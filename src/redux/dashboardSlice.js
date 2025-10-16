import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks pour récupérer les données
export const fetchStartups = createAsyncThunk('dashboard/fetchStartups', async () => {
  const response = await axios.get('http://localhost:4000/Startup');
  return response.data;
});

export const fetchEvents = createAsyncThunk('dashboard/fetchEvents', async () => {
  const response = await axios.get('http://localhost:4000/Events');
  return response.data;
});
export const fetchUsers = createAsyncThunk('dashboard/fetchUsers', async () => {
  const response = await axios.get('http://localhost:4000/users');
  return response.data;
});


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    startups: [],
    events: [],
    users:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStartups.pending, (state) => { state.loading = true; })
      .addCase(fetchStartups.fulfilled, (state, action) => { state.loading = false; state.startups = action.payload; })
      .addCase(fetchStartups.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(fetchEvents.pending, (state) => { state.loading = true; })
      .addCase(fetchEvents.fulfilled, (state, action) => { state.loading = false; state.events = action.payload; })
      .addCase(fetchEvents.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
  },
});

export default dashboardSlice.reducer;
