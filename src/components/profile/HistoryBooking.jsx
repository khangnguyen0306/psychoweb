import React from 'react';
import { Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slices/auth.slice';
import { useGetAppointmentsByUserIdQuery } from '../../services/doctorAPI';

const { Text } = Typography;

const HistoryBooking = () => {
    const currentUser = useSelector(selectCurrentUser);
    const userId = currentUser?.id;

    // Lấy lịch hẹn dựa trên ID người dùng hiện tại
    const { data: appointmentData, isLoading, isError } = useGetAppointmentsByUserIdQuery(userId, {
        skip: !userId,
    });

    const columns = [
        {
            title: 'Mã đặt lịch',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ngày đặt lịch',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Ngày hẹn',
            dataIndex: 'appointmentDate',
            key: 'appointmentDate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Phí tư vấn',
            dataIndex: 'consultationFee',
            key: 'consultationFee',
            render: (fee) => <Text>{`${fee.toLocaleString()} VND`}</Text>,
        },
        {
            title: 'Lý do',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color;
                let backgroundColor;
                switch (status) {
                    case 'CREATED':
                        color = '#666'; // Màu xám đậm cho chữ
                        backgroundColor = '#f5f5f5'; // Nền xám nhạt
                        break;
                    case 'PAID':
                        color = '#0056b3'; // Màu xanh đậm cho chữ
                        backgroundColor = '#e0f7ff'; // Nền xanh nhạt
                        break;
                    case 'COMPLETED':
                        color = '#2e7d32'; // Màu xanh đậm cho chữ
                        backgroundColor = '#e8f5e9'; // Nền xanh nhạt
                        break;
                    case 'CANCELLED':
                        color = '#c62828'; // Màu đỏ đậm cho chữ
                        backgroundColor = '#ffebee'; // Nền đỏ nhạt
                        break;
                    default:
                        color = 'black';
                        backgroundColor = 'white';
                }
                return (
                    <Text
                        style={{
                            color,
                            backgroundColor,
                            fontWeight: 'bold',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            display: 'inline-block',
                        }}
                    >
                        {status}
                    </Text>
                );
            },
        },
    ];

    const data = appointmentData?.data.map((appointment) => ({
        key: appointment.id,
        id: appointment.id,
        bookingDate: appointment.bookingDate,
        appointmentDate: appointment.appointmentDate,
        consultationFee: appointment.consultationFee,
        reason: appointment.reason || 'Không có lý do được cung cấp',
        status: appointment.status,
    })) || [];

    if (isLoading) return <p>Đang tải lịch sử đặt lịch...</p>;
    if (isError) return <p>Không thể tải lịch sử đặt lịch.</p>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Lịch Sử Đặt Lịch</h2>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};

export default HistoryBooking;
