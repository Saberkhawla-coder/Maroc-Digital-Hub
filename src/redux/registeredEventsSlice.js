import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: JSON.parse(localStorage.getItem('registeredEvents')) || [],
};

const registeredEventsSlice = createSlice({
  name: 'registeredEvents',
  initialState,
  reducers: {
    registerEvent: (state, action) => {
      const exists = state.events.some(
        e => e.id === action.payload.id && e.userId === action.payload.userId
      );
      if (!exists) {
        state.events.push(action.payload);
        localStorage.setItem('registeredEvents', JSON.stringify(state.events));
      }
    },
    unregisterEvent: (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload);
      localStorage.setItem('registeredEvents', JSON.stringify(state.events));
    },
  },
});

export const { registerEvent, unregisterEvent } = registeredEventsSlice.actions;
export default registeredEventsSlice.reducer;
