import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Sidebar from './AdminSidebar';
import { useGetAllUsersQuery, useCreateUserMutation, useEditProfileMutation, useDeleteUserMutation } from '../../services/userAPI';

const AdminUser = () => {
  const { data: usersData, isLoading, isError } = useGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [editUser] = useEditProfileMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    password: '123@',
    email: '',
    dateOfBirth: '',
    phonenumber: '',
    address: '',
    gender: '',
    role: 'USER',
    userImage: '',
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const openModal = (user = null) => {
    setIsModalOpen(true);
    setIsEditing(!!user);
    setEditingUser(user);
    setFormData(user || {
      fullname: '',
      password: '123@',
      email: '',
      dateOfBirth: '',
      phonenumber: '',
      address: '',
      gender: '',
      role: 'USER',
      userImage: '',
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = 'Tên đầy đủ là bắt buộc';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing && editingUser) {
        await editUser({ userId: editingUser.id, ...formData });
      } else {
        await createUser(formData);
      }
      setIsModalOpen(false);
      setFormData({
        fullname: '',
        password: '123@',
        email: '',
        dateOfBirth: '',
        phonenumber: '',
        address: '',
        gender: '',
        role: 'USER',
        userImage: '',
      });
    } catch (error) {
      console.error('Lỗi khi gửi biểu mẫu:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
      }
    }
  };

  const filteredUsers = usersData?.data
    .filter((user) => user.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((user) => (roleFilter ? user.role === roleFilter : true));

  if (isLoading) return <p>Đang tải danh sách người dùng...</p>;
  if (isError) return <p>Lỗi khi tải danh sách người dùng. Vui lòng thử lại sau.</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 fixed inset-y-0 left-0 z-10" />

      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên..."
              className="px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-md"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Tất cả vai trò</option>
              <option value="USER">Người dùng</option>
              <option value="PSYCHIATRIST">Bác sĩ</option>
              <option value="ADMIN">Quản trị viên</option>
            </select>
          </div>
          <button
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
            onClick={() => openModal()}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Thêm người dùng mới
          </button>
        </div>

        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Tên đầy đủ</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Email</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Vai trò</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="py-3 px-6">{user.fullname}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6 flex items-center">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      onClick={() => openModal(user)}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(user.id)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Chỉnh sửa người dùng' : 'Tạo người dùng'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Tên đầy đủ"
                  className="mb-2 px-4 py-2 border rounded w-full"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {errors.fullname && <p className="text-red-600 text-sm">{errors.fullname}</p>}
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="mb-2 px-4 py-2 border rounded w-full"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  className="mb-2 px-4 py-2 border rounded w-full"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isEditing}
                />
                
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Ngày sinh"
                  className="mb-2 px-4 py-2 border rounded w-full"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="phonenumber"
                  placeholder="Số điện thoại"
                  className="mb-2 px-4 py-2 border rounded w-full"
                  value={formData.phonenumber}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  className="mb-2 px-4 py-2 border rounded w-full"
                  value={formData.address}
                  onChange={handleChange}
                />

                <select
                  name="gender"
                  className="mb-2 px-4 py-2 border rounded w-full"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>

                <input
                  type="hidden"
                  name="role"
                  value="USER"
                />

                <input
                  type="text"
                  name="userImage"
                  placeholder="URL ảnh đại diện"
                  className="mb-2 px-4 py-2 border rounded w-full"
                  value={formData.userImage}
                  onChange={handleChange}
                />

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    {isEditing ? 'Cập nhật người dùng' : 'Tạo người dùng'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
