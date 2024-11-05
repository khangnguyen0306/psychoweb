import React, { useState } from 'react';
import { Button, Table, Tag, Tooltip, Space, Layout, Tabs } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import dayjs from 'dayjs';

const generateFakeSlots = () => {
    const slots = [];
    for (let i = 8; i <= 17; i++) {
        slots.push(
            {
                id: `${i}:00`,
                time: `${i}:00`,
                status: 'Available',
            },
            {
                id: `${i}:30`,
                time: `${i}:30`,
                status: 'Available',
            }
        );
    }
    return slots;
};

const generateFakeAppointments = () => {
    const appointments = [];
    const customerNames = ['Nguyễn Văn Khánh', 'Trần Thị Tuyết Mai', 'Lê Hoàng Khánh Châu', 'Phạm Văn Đồng', 'Đỗ Ngọc Yến Vy', 'Vũ Thị Thu Phương', 'Bùi Quang Dũng', 'Phan Hồng Nhung', 'Hoàng Nam Hải ', 'Lý Thanh Tùng'];
    const reasons = ['Khám sức khỏe', 'Tư vấn tâm lý', 'Khám bệnh', 'Đặt hẹn', 'Tham vấn'];
    const numberOfAppointments = Math.floor(Math.random() * 8) + 1;
    for (let i = 1; i <= numberOfAppointments; i++) {
        const randomCustomer = customerNames[Math.floor(Math.random() * customerNames.length)];
        const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
        appointments.push({
            id: i,
            date: dayjs().add(i, 'day').format('YYYY-MM-DD'),
            status: 'Scheduled',
            customerName: randomCustomer,
            time: `${8 + i}:00`,
            bookingDetails: [
                {
                    id: 1,
                    name: randomCustomer,
                    bookingTime: '09:00',
                    reason: randomReason,
                    email: `${randomCustomer.replace(' ', '').toLowerCase()}@example.com`,
                    phone: `090${Math.floor(Math.random() * 10000000)}`,
                },
            ],
        });
    }
    return appointments;
};

const ManageBooking = () => {
    const [slots, setSlots] = useState(generateFakeSlots());
    const [appointments] = useState(generateFakeAppointments());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Available' ? 'green' : 'red'}>{status}</Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button
                            type='primary'
                            icon={<EditFilled />}
                            onClick={() => setSelectedSlot(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            icon={<DeleteFilled />}
                            onClick={() => setSlots(slots.filter((slot) => slot.id !== record.id))}
                            danger
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const bookingColumns = [
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Scheduled' ? 'green' : 'red'}>{status}</Tag>
            ),
        },
    ];

    const expandedRowRender = (record) => {
        const bookingDetailsColumns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
            { title: 'Giờ đặt', dataIndex: 'bookingTime', key: 'bookingTime' },
            { title: 'Lý do đặt', dataIndex: 'reason', key: 'reason' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        ];
        return (
            <Table
                className='w-full'
                columns={bookingDetailsColumns}
                dataSource={record.bookingDetails}
                pagination={false}
                rowKey="id"
            />
        );
    };

    const BookingTimeManagement = () => (
        <Layout className="flex flex-col items-center w-full mt-[20px]">
            <div className="flex w-full justify-end mb-5">
                <Button type="primary" icon={<PlusOutlined />}>
                    Thêm giờ
                </Button>
            </div>

            <Table
                className="w-[100%]"
                columns={columns}
                dataSource={slots}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </Layout>
    );

    const AppointmentManagement = () => (
        <Layout className="flex flex-col items-center w-full mt-[20px]">
            <Table
                className="w-[100%]"
                columns={bookingColumns}
                dataSource={appointments}
                rowKey="id"
                expandedRowRender={expandedRowRender}
                pagination={{ pageSize: 5 }}
            />
        </Layout>
    );

    return (
        <Layout className="flex flex-col items-center w-full mt-[100px]">
            <div className="flex justify-center px-5 w-fit">
                <p className="font-bold text-center w-fit text-4xl mb-5 mt-3 bg-custom-gradient bg-clip-text text-transparent"
                    style={{ textShadow: '2px 4px 8px rgba(0, 0, 0, 0.2)' }}
                >
                    Quản lý Đặt lịch
                </p>
            </div>
            <Tabs defaultActiveKey="1" className='w-[90%]'>
                <Tabs.TabPane tab="Quản lý thời gian hẹn" key="1">
                    <BookingTimeManagement />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Quản lý lịch hẹn" key="2">
                    <AppointmentManagement />
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
};

export default ManageBooking;
