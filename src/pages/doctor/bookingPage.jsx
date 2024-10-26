import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Form, Input, Button, DatePicker, Radio, Image, Select, ConfigProvider, Skeleton, message } from 'antd';
import dayjs from 'dayjs';
import 'tailwindcss/tailwind.css';
import 'dayjs/locale/vi';
import CustomHeader from '../../components/Header/CustomHeader';
import { CalendarFilled, ClockCircleFilled, EnvironmentFilled, EnvironmentOutlined } from '@ant-design/icons';
import dateIcon from '../../assets/image/schedule.svg'
import clockIcon from '../../assets/image/time.svg'
import locationIcon from '../../assets/image/location.svg'
import { useBookingApointmentMutation, useGetDoctorDetailQuery } from '../../services/doctorAPI';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slices/auth.slice';



const BookingPage = () => {

    const user = useSelector(selectCurrentUser)
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const timeId = searchParams.get("timeSlotId");
    const bsId = searchParams.get("bsId");
    const { data: doctorData, isLoading, error } = useGetDoctorDetailQuery(bsId);
    const [bookingApoinment, { isLoading: bookingProcess }] = useBookingApointmentMutation()
    const navigate = useNavigate()

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        values.appointmentDate = dayjs(date);
        values.userId = user?.id;
        values.psychiatristId = parseInt(bsId);
        values.timeSlotId = parseInt(timeId);
        values.bookingDate = dayjs()
        try {
            await bookingApoinment(values).unwrap().then(() => {
                message.success('Đặt lịch thành công !');
                form.resetFields();
                navigate("/doctor");
            });
        } catch (error) {
            message.error("Đặt lịch thất bại !")
            console.log(error)
        }
    };

    if (isLoading) {
        return <Skeleton active />
    }
    return (
        <>
            <div className="p-6 flex flex-col items-center w-full mt-[100px]">
                <h1 className="text-4xl font-bold text-center mb-6">Đặt Lịch Khám</h1>
                {/* Thông tin bác sĩ */}
                <Card className="mb-6 shadow-lg p-1  z-10 w-[80%]">
                    <div className="flex items-start ml-[100px]">
                        {/* Hình ảnh bác sĩ */}
                        <Image
                            width={170}
                            height={170}
                            src={doctorData?.userImage || 'https://via.placeholder.com/150'}
                            alt="Bác sĩ"
                            className="rounded-full shadow-lg mr-6"
                        />
                        {/* Chi tiết bác sĩ */}
                        <div className="flex-1 gap-1 ml-12">
                            <p className="text-lg mb-1">{doctorData?.specialization}</p>
                            <Link to={`/doctor${doctorData?.id}`}> <h2 className="text-2xl font-bold text-blue-500">{doctorData?.fullname}</h2></Link>
                            <div className="mt-2 text-[17px] flex flex-col gap-2">
                                <p className='flex items-center'>
                                    <Image preview={false} src={dateIcon} width={20} />
                                    <p className='text-[#f7bf48] ml-2 font-bold'><span className='text-black'>Ngày hẹn:</span> {dayjs(date).format("DD / MM / YYYY")} ({dayjs(date).locale('vi').format("dddd")}) </p>
                                </p>
                                <p className='flex items-center'>
                                    <Image preview={false} src={clockIcon} width={20} />
                                    <p className='text-[#5dd339] ml-2 font-bold'><span className='text-black'>Giờ hẹn:</span> {time}  </p>
                                </p>
                                <p className='flex items-center'>
                                    <Image preview={false} src={locationIcon} width={20} />
                                    <p className='text-[#000] ml-2'><span className='text-black font-bold'>Địa Chỉ Phòng Khám: </span> {doctorData?.location} </p>
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Form Đặt Lịch */}
                <div className='flex justify-center w-[80%]'>
                    <ConfigProvider
                        theme={{
                            components: {
                                Card: {
                                    headerBg: "#d4effc"
                                },
                            },
                        }}
                    >
                        <Card title={<span className='text-xl font-bold text-center w-full'>Thông Tin Đặt Lịch Khám</span>} className="shadow-lg p-4 text-center w-[70%]">
                            <Form form={form} layout="vertical" onFinish={onFinish} > {/* Pass the form instance here */}
                                {/* <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>

                                <Form.Item label="Giới tính" name="gender" className='text-left' rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
                                    <Radio.Group>
                                        <Radio value="Nam">Nam</Radio>
                                        <Radio value="Nữ">Nữ</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="Số điện thoại" name="phonenumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                                    <Input placeholder="Số điện thoại" />
                                </Form.Item>

                                <Form.Item label="Email liên lạc" name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }, { type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}>
                                    <Input placeholder="Email liên lạc" />
                                </Form.Item>

                                <Form.Item label="Ngày tháng năm sinh" name="dateOfBirth" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
                                    <DatePicker className="w-full" />
                                </Form.Item>

                                <Form.Item label="Địa chỉ thường trú" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ thường trú' }]}>
                                    <Input placeholder="Địa chỉ thường trú" />
                                </Form.Item> */}

                                <Form.Item label="Mô tả sơ lược tình trạng / lý do khám" name="reason" rules={[{ required: true, message: 'Vui lòng mô tả tình trạng hoặc lý do khám' }]}>
                                    <Input.TextArea rows={4} placeholder="Mô tả tình trạng hoặc lý do khám" />
                                </Form.Item>

                                <Form.Item label="Hình thức thanh toán"  initialValue="sandbox">
                                    <Select>
                                        <Select.Option value="sandbox">Thanh toán trực tuyến</Select.Option>
                                        {/* <Select.Option value="other">Phương thức thanh toán khác</Select.Option> */}
                                    </Select>
                                </Form.Item>

                                {/* Lưu ý */}
                                <div className="bg-[#d4effc] p-4 rounded-md mb-4 text-left">
                                    <p className="text-[16px] mb-2">
                                        <b>Lưu ý:</b> Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh. Vui lòng đảm bảo:
                                    </p>
                                    <ul className="list-disc pl-5 text-[16px]">
                                        <li>Kiểm tra tất cả các thông tin đã nhập</li>
                                        <li>Đến đúng giờ hẹn, không giải quyết các trường hợp đến sai ngày hoặc giờ hẹn</li>
                                    </ul>
                                </div>

                                {/* Nút xác nhận */}
                                <Form.Item>
                                    <Button size='large' type="primary" htmlType="submit" className="w-full  mx-auto py-4">
                                        Xác nhận đặt khám
                                    </Button>
                                </Form.Item>

                                {/* Đồng ý điều khoản */}
                                <p className="text-sm text-center mt-2">
                                    Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với <a href="#" className="text-blue-500 underline">Điều khoản sử dụng</a> của Wellmeet.
                                </p>
                            </Form>
                        </Card>
                    </ConfigProvider>
                </div>
            </div>
        </>
    );
};

export default BookingPage;
