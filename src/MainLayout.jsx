import React from 'react'
import Navbar from './Home/Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
        <Navbar/>
        <div className="main-container">
        <Outlet /> 
      </div>
    </div>
  )
}

export default MainLayout