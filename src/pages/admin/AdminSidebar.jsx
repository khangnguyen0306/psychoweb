// AdminSidebar.js
import React from 'react';
import { DashboardOutlined, UserOutlined, FileTextOutlined, SettingOutlined, BarChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from "../../slices/auth.slice";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col p-4 shadow-lg fixed">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="space-y-4">
        <Link to="/admin" className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
          <DashboardOutlined />
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/users" className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
          <UserOutlined />
          <span>Quản lý người dùng</span>
        </Link>
        <Link to="/admin/reports" className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
          <FileTextOutlined />
          <span>Báo cáo</span>
        </Link>
        <Link to="/admin/analytics" className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
          <BarChartOutlined />
          <span>Phân tích</span>
        </Link>
        <Link to="/admin/settings" className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md">
          <SettingOutlined />
          <span>Cài đặt hệ thống</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-white hover:bg-gray-700 p-2 rounded-md mt-auto w-full text-left"
        >
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
