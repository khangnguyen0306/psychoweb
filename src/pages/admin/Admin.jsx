import React from 'react';
import { DollarOutlined, ShoppingCartOutlined, UserOutlined, FileTextOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons';
import Sidebar from './AdminSidebar';
import { useGetDashboardQuery } from '../../services/userAPI';

const Dashboard = () => {
  // Fetch data using the useGetDashboardQuery hook
  const { data, error, isLoading } = useGetDashboardQuery();

  // If loading or error occurs, show appropriate messages
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading dashboard data</p>;

  // Extract values from API response
  const { totalRevenue, totalAppointments, totalAccount } = data?.data || {};

  return (
    <div className="flex">
      {/* Sidebar with fixed width */}
      <Sidebar className="w-64" />

      {/* Main Content Area with left margin to accommodate the sidebar */}
      <div className="ml-64 p-6 bg-gray-100 min-h-screen flex-1">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển quản trị</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Cài đặt</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md">Đăng xuất</button>
          </div>
        </header>

        {/* Summary Section */}
        <section className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <DollarOutlined className="text-green-600 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Tổng doanh thu</h2>
              <p className="text-gray-500">${totalRevenue?.toLocaleString() || 0}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <ShoppingCartOutlined className="text-blue-600 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Tổng giao dịch</h2>
              <p className="text-gray-500">{totalAppointments?.toLocaleString() || 0} giao dịch</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <UserOutlined className="text-purple-600 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Tổng số tài khoản</h2>
              <p className="text-gray-500">{totalAccount?.toLocaleString() || 0} tài khoản</p>
            </div>
          </div>
        </section>

        {/* Additional sections (e.g., recent activities, quick actions) can go below */}
        
        {/* Recent Activities Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hoạt động gần đây</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center text-gray-600">
              <p>Người dùng mới đã đăng ký: <span className="font-semibold text-gray-800">John Doe</span></p>
              <span className="text-gray-500 text-sm">5 phút trước</span>
            </li>
            <li className="flex justify-between items-center text-gray-600">
              <p>Người dùng <span className="font-semibold text-gray-800">Jane Smith</span> đã tải lên một báo cáo</p>
              <span className="text-gray-500 text-sm">10 phút trước</span>
            </li>
            <li className="flex justify-between items-center text-gray-600">
              <p>Cài đặt hệ thống được cập nhật bởi <span className="font-semibold text-gray-800">Quản trị viên</span></p>
              <span className="text-gray-500 text-sm">1 giờ trước</span>
            </li>
          </ul>
        </section>

        {/* Quick Actions Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hành động nhanh</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-500 transition">
              <div className="flex items-center justify-center space-x-2">
                <UserOutlined />
                <span>Thêm người dùng mới</span>
              </div>
            </button>
            <button className="bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-500 transition">
              <div className="flex items-center justify-center space-x-2">
                <FileTextOutlined />
                <span>Tạo báo cáo</span>
              </div>
            </button>
            <button className="bg-yellow-600 text-white py-3 rounded-lg shadow hover:bg-yellow-500 transition">
              <div className="flex items-center justify-center space-x-2">
                <PieChartOutlined />
                <span>Xem phân tích</span>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
