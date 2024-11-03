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
    password: '',
    email: '',
    dateOfBirth: '',
    phonenumber: '',
    address: '',
    gender: '',
    role: '',
    userImage: '',
  });

  const openModal = (user = null) => {
    setIsModalOpen(true);
    setIsEditing(!!user);
    setEditingUser(user);
    setFormData(user || {
      fullname: '',
      password: '',
      email: '',
      dateOfBirth: '',
      phonenumber: '',
      address: '',
      gender: '',
      role: '',
      userImage: '',
    });
  };

  const handleSubmit = async () => {
    if (isEditing && editingUser) {
      await editUser({ userId: editingUser.id, ...formData });
    } else {
      await createUser(formData);
    }
    setIsModalOpen(false);
    setFormData({
      fullname: '',
      password: '',
      email: '',
      dateOfBirth: '',
      phonenumber: '',
      address: '',
      gender: '',
      role: '',
      userImage: '',
    });
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = usersData?.data
    .filter((user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (roleFilter ? user.role === roleFilter : true));

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users. Please try again later.</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 fixed inset-y-0 left-0 z-10" /> {/* Sidebar with fixed positioning */}

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-6 bg-gray-100"> {/* Main content area has a left margin to avoid overlap */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-md"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="USER">USER</option>
              <option value="PSYCHIATRIST">PSYCHIATRIST</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <button
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
            onClick={() => openModal()}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New User
          </button>
        </div>

        {/* User Table */}
        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Full Name</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Email</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Role</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="py-3 px-6">{user.fullname}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6">
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

        {/* Modal (omitted for brevity) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
