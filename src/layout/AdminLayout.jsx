// AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/admin/AdminSidebar'; // Make sure this path is correct

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Sidebar component for navigation */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet /> {/* Outlet for rendering child routes */}
      </main>
    </div>
  );
};

export default AdminLayout;
