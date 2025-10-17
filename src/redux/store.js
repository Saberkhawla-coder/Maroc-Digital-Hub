import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import registeredEventsReducer from "./registeredEventsSlice";
import searchReducer from './searchSlice'
import EventsData from './Events'
import ForumData from "./Forums"
import dashboardReducer from './dashboardSlice';
import StartupData from "./Startups"

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: EventsData, 
    forums:ForumData,
    startups: StartupData,
    dashboard: dashboardReducer,
    search: searchReducer,
    registeredEvents: registeredEventsReducer,
  },
})
