import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, Image, Layout, Row, Col, DatePicker, Button, Typography, Divider, message, Empty, Skeleton } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import CustomHeader from '../../components/Header/CustomHeader';
import CustomFooter from '../../components/Footer/CustomFooter';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useGetDoctorDetailQuery, useBookingApointmentMutation } from '../../services/doctorAPI';

const { Title, Text } = Typography;

const DoctorDetailPage = () => {
    const { userId } = useParams();
    const { data: doctorData, isLoading, isError } = useGetDoctorDetailQuery(userId);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [bookAppointment] = useBookingApointmentMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (doctorData && doctorData.data) {
            const filteredTimes = doctorData.data.timeSlots
                .filter(slot => dayjs(slot.slotDate).isSame(selectedDate, 'day'))
                .map(slot => ({
                    time: `${dayjs(slot.startTime, 'HH:mm').format('HH:mm')} - ${dayjs(slot.endTime, 'HH:mm').format('HH:mm')}`,
                    timeSlotId: slot.timeSlotId,
                }));
            setAvailableTimes(filteredTimes);
        }
    }, [doctorData, selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeClick = (time, timeSlotId) => {
        const formattedDate = selectedDate.format("YYYY/MM/DD");
        navigate(`/booking?date=${formattedDate}&time=${time}&bsId=${doctor.id}&timeSlotId=${timeSlotId}&bsIsUser=${doctor.userId}`);
    };

    if (isLoading) return <div className='flex justify-center items-center'><Skeleton/></div>;
    if (isError) return <div className='flex justify-center items-center'><Skeleton/></div>;

    const doctor = doctorData?.data;


    return (
        <Layout>
            <CustomHeader />
            <div className="container mx-auto p-6 mt-24 mb-20 min-h-[100vh] h-fit">
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                        <span>Trang chủ</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/doctor">
                        <UserOutlined />
                        <span>Bác sĩ</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span className='text-[#214175] font-bold'>{doctor?.fullname || "Tên bác sĩ"}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Card className="shadow-lg rounded-lg overflow-hidden bg-white p-6 mb-10">
                    <Row gutter={32} align="top">
                        {/* Doctor's Image */}
                        <Col xs={24} md={6} className="flex justify-center md:justify-start">
                            {doctor?.userImage ? (
                                <Image
                                    src={doctor.userImage}
                                    alt="Doctor"
                                    width={200}
                                    height={200}
                                    className="rounded-full object-cover shadow-lg"
                                />
                            ) : (
                                <UserOutlined style={{ fontSize: '200px', color: '#aaa' }} />
                            )}
                        </Col>

                        {/* Doctor's Information */}
                        <Col xs={24} md={10}>
                            <Title level={2} className="text-[#4082ec]">{doctor?.fullname || "Tên bác sĩ"}</Title>
                            <Text strong className="text-gray-600">{doctor?.specialization || "Chuyên môn không có sẵn"}</Text>
                            <p>{doctor?.bio || "Không có thông tin"}</p>
                            <Divider className="my-2" />
                            <p><Text strong>Email:</Text> {doctor?.email || "Không có sẵn"}</p>
                            <p><Text strong>Phone:</Text> {doctor?.phonenumber || "Không có sẵn"}</p>
                            <p><Text strong>Address:</Text> {doctor?.address || "Không có sẵn"}</p>
                            <p><Text strong>Gender:</Text> {doctor?.gender || "Không có sẵn"}</p>
                            <p><Text strong>Date of Birth:</Text> {doctor?.dateOfBirth ? dayjs(doctor.dateOfBirth).format("DD/MM/YYYY") : "Không có sẵn"}</p>
                            <p><Text strong>Experience:</Text> {doctor?.experience || "Không có sẵn"}</p>
                            <p><Text strong>Consultation Fee:</Text> {doctor?.consultationFee ? `${doctor.consultationFee} VND` : "Không có sẵn"}</p>
                        </Col>

                        {/* Appointment Scheduling */}
                        <Col xs={24} md={8}>
                            <Title level={4}>Lịch khám</Title>
                            <DatePicker
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="w-full mb-4"
                                format="DD / MM / YYYY"
                            />
                            <Title level={4}>Giờ khám</Title>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((slot, index) => (
                                        <Button key={index} type='primary' className="w-full" onClick={() => handleTimeClick(slot.time, slot.timeSlotId)}>
                                            {slot.time}
                                        </Button>
                                    ))
                                ) : (
                                    <Empty description="Không có giờ có sẵn" />
                                )}
                            </div>
                            <Title level={4}>Địa chỉ phòng khám</Title>
                            <p>{doctor?.location || "Địa chỉ không có sẵn"}</p>
                        </Col>
                    </Row>
                </Card>
            </div>
            <CustomFooter />
        </Layout>
    );
};

export default DoctorDetailPage;
