import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import registeredEventsReducer from "./registeredEventsSlice";
import searchReducer from './searchSlice'
import dashboardReducer from './dashboardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    search: searchReducer,
    registeredEvents: registeredEventsReducer,
  },
})
