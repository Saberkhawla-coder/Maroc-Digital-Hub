import React from 'react';
import Sidebar from './Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-0 ps-[1px] bg-white">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout;
