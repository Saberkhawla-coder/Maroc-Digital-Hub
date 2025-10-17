import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('user')) || {
  role: 'visiteur',
  isAuthenticated: false,
  userData: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login:(state, action) => {
      state.role = action.payload.role.toLowerCase() 
      state.userData = action.payload.userData
      state.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(state))
    },
    logout: (state) => {
      state.role = 'visiteur'
      state.userData = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
