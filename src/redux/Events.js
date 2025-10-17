import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchEvents=createAsyncThunk('/Events', async()=>{
    const res=await axios.get('http://localhost:4000/Events')
    return res.data
})

const EventsData=createSlice({
    name:"Events",
    initialState:{
        events:[],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchEvents.pending,(state)=>{state.loading=true;})
        .addCase(fetchEvents.fulfilled,(state, action)=>{state.loading=false; state.events=action.payload})
        .addCase(fetchEvents.rejected,(state,action)=>{state.loading=false; state.action=action.error.message})
    }
})
export default EventsData.reducer;