import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Sidebar from './AdminSidebar';
import {
  useGetAllDoctorQuery,
  useCreateDoctorMutation,
  useEditDoctorMutation,
  useDeleteDoctorMutation
} from '../../services/doctorAPI';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDoctor = () => {
  const { data: doctorsData, isLoading, isError, refetch } = useGetAllDoctorQuery();
  const [createDoctor] = useCreateDoctorMutation();
  const [editDoctor] = useEditDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    password: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    gender: '',
    userImage: '',
    specialization: '',
    bio: '',
    experience: '',
    location: '',
    consultationFee: 0,
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (doctor = null) => {
    setIsModalOpen(true);
    setIsEditing(!!doctor);
    setEditingDoctor(doctor);
    setFormData(doctor || {
      fullname: '',
      password: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: '',
      address: '',
      gender: '',
      userImage: '',
      specialization: '',
      bio: '',
      experience: '',
      location: '',
      consultationFee: 0,
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = 'Tên đầy đủ là bắt buộc';
    if (!formData.password && !isEditing) newErrors.password = 'Mật khẩu là bắt buộc';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Số điện thoại là bắt buộc';
    if (!formData.address) newErrors.address = 'Địa chỉ là bắt buộc';
    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.userImage) newErrors.userImage = 'URL ảnh đại diện là bắt buộc';
    if (!formData.specialization) newErrors.specialization = 'Chuyên môn là bắt buộc';
    if (!formData.bio) newErrors.bio = 'Tiểu sử là bắt buộc';
    if (!formData.experience) newErrors.experience = 'Kinh nghiệm là bắt buộc';
    if (!formData.location) newErrors.location = 'Địa chỉ phòng khám là bắt buộc';
    if (formData.consultationFee === null || formData.consultationFee === undefined) newErrors.consultationFee = 'Phí khám là bắt buộc';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const doctorPayload = {
        fullname: formData.fullname,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        phonenumber: formData.phoneNumber,
        address: formData.address,
        gender: formData.gender,
        userImage: formData.userImage,
        consultationFee: formData.consultationFee,
        specialization: formData.specialization,
        bio: formData.bio,
        experience: formData.experience,
        location: formData.location,
      };

      if (isEditing && editingDoctor) {
        await editDoctor({ userId: editingDoctor.userId, ...doctorPayload });
        toast.success('Cập nhật bác sĩ thành công!');
      } else {
        await createDoctor(doctorPayload);
        toast.success('Tạo bác sĩ thành công!');
      }

      setIsModalOpen(false);
      refetch(); // Reload data
      resetFormData();
    } catch (error) {
      console.error('Lỗi khi gửi biểu mẫu:', error);
      toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này?')) {
      try {
        await deleteDoctor(userId);
        toast.success('Xóa bác sĩ thành công!');
        refetch(); // Reload data after deletion
      } catch (error) {
        console.error('Lỗi khi xóa bác sĩ:', error);
        toast.error('Lỗi khi xóa bác sĩ.');
      }
    }
  };

  const resetFormData = () => {
    setFormData({
      fullname: '',
      password: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: '',
      address: '',
      gender: '',
      userImage: '',
      specialization: '',
      bio: '',
      experience: '',
      location: '',
      consultationFee: 0,
    });
    setEditingDoctor(null);
    setIsEditing(false);
  };

  const filteredDoctors = doctorsData?.data
    .filter((doctor) => doctor.fullname.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleViewDetails = (userId) => {
    navigate(`/doctor/${userId}`);
  };

  if (isLoading) return <p>Đang tải danh sách bác sĩ...</p>;
  if (isError) return <p>Lỗi khi tải danh sách bác sĩ. Vui lòng thử lại sau.</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 fixed inset-y-0 left-0 z-10" />
      <ToastContainer />
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            className="px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
            onClick={() => openModal()}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Thêm bác sĩ mới
          </button>
        </div>

        <div className="bg-white shadow-md rounded overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Tên đầy đủ</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Chuyên môn</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Email</th>
                <th className="py-3 px-6 bg-gray-100 font-semibold text-gray-600 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors?.map((doctor) => (
                <tr key={doctor.userId} className="border-b border-gray-200">
                  <td className="py-3 px-6">{doctor.fullname}</td>
                  <td className="py-3 px-6">{doctor.specialization}</td>
                  <td className="py-3 px-6">{doctor.email}</td>
                  <td className="py-3 px-6 flex items-center space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleViewDetails(doctor.userId)}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openModal(doctor)}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(doctor.userId)}
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
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
              <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Chỉnh sửa bác sĩ' : 'Tạo bác sĩ'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "fullname", placeholder: "Tên đầy đủ" },
                    { name: "password", placeholder: "Mật khẩu", type: "password" },
                    { name: "email", placeholder: "Email", type: "email" },
                    { name: "dateOfBirth", placeholder: "Ngày sinh", type: "date" },
                    { name: "phoneNumber", placeholder: "Số điện thoại" },
                    { name: "address", placeholder: "Địa chỉ" },
                    { name: "gender", placeholder: "Giới tính" },
                    { name: "userImage", placeholder: "URL ảnh đại diện" },
                    { name: "specialization", placeholder: "Chuyên môn" },
                    { name: "bio", placeholder: "Tiểu sử" },
                    { name: "experience", placeholder: "Kinh nghiệm" },
                    { name: "location", placeholder: "Địa chỉ phòng khám" },
                    { name: "consultationFee", placeholder: "Phí khám", type: "number" }
                  ].map((field, index) => (
                    <div key={index}>
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="mb-2 px-4 py-2 border rounded w-full"
                        value={formData[field.name]}
                        onChange={handleChange}
                      />
                      {errors[field.name] && <p className="text-red-600 text-sm">{errors[field.name]}</p>}
                    </div>
                  ))}
                </div>

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
                    {isEditing ? 'Cập nhật bác sĩ' : 'Tạo bác sĩ'}
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

export default AdminDoctor;
