import React from 'react';
import { Collapse, Layout, Tag, Typography } from 'antd';


const { Panel } = Collapse;
const { Text } = Typography;

const appointments = [
  {
    id: 1,
    time: '08:00',
    status: 'ongoing',
    client: {
      name: 'Nguyễn Văn Xuân anh',
      email: 'vana@example.com',
      phone: '0123456789',
      reason: 'Tư vấn tâm lý gia đình',
      price: '500,000 VND'
    }
  },
  {
    id: 2,
    time: '09:00',
    status: 'upcoming',
    client: {
      name: 'Trần Thị Cẩm Tiên',
      email: 'thib@example.com',
      phone: '0987654321',
      reason: 'Điều trị tâm lý căng thẳng',
      price: '500,000 VND'
    }
  },
  {
    id: 3,
    time: '10:30',
    status: 'upcoming',
    client: {
      name: 'Lê Văn Vĩnh Châu ',
      email: 'vanc@example.com',
      phone: '0345678901',
      reason: 'Trị liệu tâm lý cá nhân',
      price: '500,000 VND'
    }
  },
  {
    id: 4,
    time: '11:00',
    status: 'upcoming',
    client: {
      name: 'Bùi Thị Tuyết Mai ',
      email: 'vanc@example.com',
      phone: '0345678901',
      reason: 'Trị liệu tâm lý cá nhân',
      price: '500,000 VND'
    }
  },

];

const DashboardForDoctor = () => {
  const getStatusTag = (status) => {
    switch (status) {
      case 'ongoing':
        return <Tag color="green">Đang diễn ra</Tag>;
      case 'upcoming':
        return <Tag color="blue">Sắp diễn ra</Tag>;
      default:
        return <Tag color="gray">Không xác định</Tag>;
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Lịch hẹn khám hôm nay</h2>

        <Collapse
          accordion
          className="bg-white shadow-lg rounded-md"
        >
          {appointments.map((appointment) => (
            <Panel
              header={
                <div className="flex justify-between items-center">
                  <Text strong className="text-lg">{`Khung giờ: ${appointment.time}`}</Text>
                  {getStatusTag(appointment.status)}
                </div>
              }
              key={appointment.id}
              className="bg-gray-50 hover:bg-gray-100 border-0 border-b border-gray-200"
            >
              <div className="p-4">
                <p><Text strong>Tên khách hàng:</Text> {appointment.client.name}</p>
                <p><Text strong>Email:</Text> {appointment.client.email}</p>
                <p><Text strong>Số điện thoại:</Text> {appointment.client.phone}</p>
                <p><Text strong>Lý do khám:</Text> {appointment.client.reason}</p>
                <p className='text-red-500'><Text strong>Giá khám:</Text> {appointment.client.price}</p>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </Layout>
  );
};

export default DashboardForDoctor;
