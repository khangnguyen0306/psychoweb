import React, { useState } from 'react';
import { Breadcrumb, Card, Image, Layout, Row, Col, DatePicker, Button } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import CustomHeader from '../../components/Header/CustomHeader';
import CustomFooter from '../../components/Footer/CustomFooter';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const DoctorDetail = () => {
    const doctorData = {
        id: 2,
        fullname: "Lê Quang Trọng",
        email: "trongle278@gmail.com",
        dateOfBirth: "2002-09-24T16:02:43.321",
        phonenumber: "01887052354",
        address: "7/20 Đường 385",
        gender: "Nữ",
        price: "1,300,000 VND",
        userImage: "https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg",
        specialization: "Bác sĩ giỏi nhất",
        bio: "Xin chào, tôi là Trọng",
        experience: "20 năm kinh nghiệm",
        location: "7/20 Đường 385",
        time: ["07:00 - 07:30", "07:30 - 08:00", "08:00 - 08:30", "09:00 - 09:30", "09:30 - 10:00", "10:00 - 10:30"]
    };
    const [availableTimes, setAvailableTimes] = useState(doctorData?.time);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const navigate = useNavigate()
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeClick = (time) => {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        navigate(`/booking?date=${formattedDate}&time=${time}&bsId=${doctorData?.id}`);
    };

    return (
        <Layout>
            <CustomHeader />
            <Card className="container mx-auto p-6 mt-24 mb-20 min-h-[100vh] h-fit">
                {/* Breadcrumb Navigation */}
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item href="/">
                        <HomeOutlined />
                        <span>Trang chủ</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/doctor">
                        <UserOutlined />
                        <span>Bác sĩ</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item><span className='text-[#214175] font-bold'>{doctorData?.fullname}</span></Breadcrumb.Item>
                </Breadcrumb>

                {/* Doctor Profile Card */}
                <div className='flex flex-col items-center justify-center'>
                    <Card className="p-6 shadow-lg  w-[60%]">
                        <Row gutter={16} justify={'space-between'} className='px-9'>
                            {/* Doctor Image */}
                            <Col xs={24} md={8}>
                                <Image
                                    src={doctorData?.userImage}
                                    alt="Doctor"
                                    width={300}
                                    height={300}
                                    className="rounded-full object-cover shadow-xl"
                                />
                            </Col>
                            {/* Doctor Information */}
                            <Col xs={24} md={12} className="flex flex-col justify-center">
                                <p className="text-gray-600 mb-1 text-base font-bold">{doctorData.specialization}</p>
                                <h2 className="text-3xl font-bold mb-5 text-[#4082ec]">{doctorData.fullname}</h2>
                                <p className="text-black mb-1"><span className='font-bold '>Email: </span>{doctorData.email}</p>
                                <p className="text-black mb-1"> <span className='font-bold '>Số điện thoại: </span> {doctorData.phonenumber}</p>
                                <p className="text-black mb-1"><span className='font-bold '>Giới tính:</span> {doctorData.gender}</p>
                                <p className="text-black mb-1"><span className='font-bold '>Kinh nghiệm: </span>{doctorData.experience}</p>
                                <p className="text-black mb-1"><span className='font-bold '>Giá thực hiện khám: </span>{doctorData.price}</p>
                            </Col>
                        </Row>
                        <hr className='mt-10'/> 
                        <Row gutter={24} justify={'space-between'} className='mt-14'>
                            <Col xs={24} md={12} className="flex flex-col items-center">
                                <h3 className="text-base font-semibold mb-2">Lịch khám</h3>
                                <DatePicker
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="w-full mb-4"
                                    format="DD / MM / YYYY"
                                />
                                <h3 className="text-base font-semibold mb-2">Giờ khám</h3>
                                <div className="grid grid-cols-3 gap-2 mb-6 w-f">
                                    {availableTimes?.map((time, index) => (
                                        <Button key={index} type='primary'  className="w-full mx-5" onClick={() => handleTimeClick(time)}>
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </Col>
                            <Col xs={24} md={12} className="flex flex-col items-center">
                                <div>
                                    <h4 className="text-lg font-semibold">Địa chỉ phòng khám</h4>
                                    <p className="text-sm">{doctorData.location}</p>
                                </div>
                            </Col>
                        </Row>
                  
                    </Card>
                  
                       
                </div>
                <div className="mt-4 p-6 bg-gray-100 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">About the Doctor</h3>
                    <p className="text-gray-700">{doctorData.bio}</p>
                </div>
            </Card>
            <CustomFooter />
        </Layout>
    );
};

export default DoctorDetail;
