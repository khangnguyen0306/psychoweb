import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Form, Input, Button, Modal, Select, ConfigProvider, Skeleton, message, Image } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useBookingApointmentMutation, useBookingAppointmentPayMutation, useGetDoctorDetailQuery } from '../../services/doctorAPI';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slices/auth.slice';
import dateIcon from '../../assets/image/schedule.svg';
import clockIcon from '../../assets/image/time.svg';
import locationIcon from '../../assets/image/location.svg';

const BookingPage = () => {
  const user = useSelector(selectCurrentUser);
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const timeId = searchParams.get("timeSlotId");
  const bsId = searchParams.get("bsId");

  const { data: doctorData, isLoading } = useGetDoctorDetailQuery(bsId);
  console.log(doctorData)
  const [bookingApoinment] = useBookingApointmentMutation();
  const [payAppointment] = useBookingAppointmentPayMutation();
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({ amount: 0, orderDescription: '', appointmentId: '' });
  const [paymentUrl, setPaymentUrl] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    values.appointmentDate = dayjs(date);
    values.userId = user?.id;
    values.psychiatristId = parseInt(bsId);
    values.timeSlotId = parseInt(timeId);
    values.bookingDate = dayjs();
  
    try {
      const bookingResponse = await bookingApoinment(values).unwrap();
      const appointmentId = bookingResponse?.data?.id;
      const consultationFee = bookingResponse?.data?.consultationFee || 50000;
  
      setPaymentInfo({
        amount: consultationFee,
        orderDescription: values.reason,
        appointmentId: String(appointmentId)
      });
  
      setPaymentModalOpen(true); // Show payment modal
    } catch (error) {
      message.error("Booking failed. Please try again.");
    }
  };
  const handlePayment = async () => {
    try {
        const paymentData = {
            orderType: "Appointment",
            amount: paymentInfo.amount,
            orderDescription: paymentInfo.orderDescription,
            appointmentId: String(paymentInfo.appointmentId),
        };

        const response = await payAppointment(paymentData).unwrap();
        
        // Access the URL from the JSON response and redirect
        if (response?.paymentUrl) {
            setPaymentUrl(response.paymentUrl); // Store URL for manual link
            window.location.href = response.paymentUrl; // Automatically redirect
        } else {
            message.error("Could not retrieve payment URL from the response.");
        }
    } catch (error) {
        message.error("Payment failed. Please try again.");
    }
};



  return (
    <>
      <div className="p-6 flex flex-col items-center w-full mt-[100px]">
        <h1 className="text-4xl font-bold text-center mb-6">Đặt Lịch Khám</h1>

        {/* Doctor Information */}
        <Card className="mb-6 shadow-lg p-1 z-10 w-[80%]">
          <div className="flex items-start ml-[100px]">
            <Image
              width={170}
              height={170}
              src={doctorData?.data.userImage || 'https://via.placeholder.com/150'}
              alt="Bác sĩ"
              className="rounded-full shadow-lg mr-6"
            />
            <div className="flex-1 gap-1 ml-12">
              <p className="text-lg mb-1">{doctorData?.data.specialization}</p>
              <Link to={`/doctor${doctorData?.id}`}>
                <h2 className="text-2xl font-bold text-blue-500">{doctorData?.data.fullname}</h2>
              </Link>
              <div className="mt-2 text-[17px] flex flex-col gap-2">
                <p className='flex items-center'>
                  <Image preview={false} src={dateIcon} width={20} />
                  <span className='text-[#f7bf48] ml-2 font-bold'>Ngày hẹn: {dayjs(date).format("DD / MM / YYYY")} ({dayjs(date).locale('vi').format("dddd")})</span>
                </p>
                <p className='flex items-center'>
                  <Image preview={false} src={clockIcon} width={20} />
                  <span className='text-[#5dd339] ml-2 font-bold'>Giờ hẹn: {time}</span>
                </p>
                <p className='flex items-center'>
                  <Image preview={false} src={locationIcon} width={20} />
                  <span className='text-[#000] ml-2'>Địa Chỉ Phòng Khám: {doctorData?.data.location}</span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Booking Form */}
        <div className='flex justify-center w-[80%]'>
          <ConfigProvider theme={{ components: { Card: { headerBg: "#d4effc" }}}}>
            <Card title={<span className='text-xl font-bold text-center w-full'>Thông Tin Đặt Lịch Khám</span>} className="shadow-lg p-4 text-center w-[70%]">
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Mô tả sơ lược tình trạng / lý do khám" name="reason" rules={[{ required: true, message: 'Vui lòng mô tả tình trạng hoặc lý do khám' }]}>
                  <Input.TextArea rows={4} placeholder="Mô tả tình trạng hoặc lý do khám" />
                </Form.Item>
                <Form.Item label="Hình thức thanh toán" initialValue="sandbox">
                  <Select>
                    <Select.Option value="sandbox">Thanh toán trực tuyến</Select.Option>
                  </Select>
                </Form.Item>

                {/* Information Notice */}
                <div className="bg-[#d4effc] p-4 rounded-md mb-4 text-left">
                  <p className="text-[16px] mb-2">
                    <b>Lưu ý:</b> Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh. Vui lòng đảm bảo:
                  </p>
                  <ul className="list-disc pl-5 text-[16px]">
                    <li>Kiểm tra tất cả các thông tin đã nhập</li>
                    <li>Đến đúng giờ hẹn, không giải quyết các trường hợp đến sai ngày hoặc giờ hẹn</li>
                  </ul>
                </div>

                {/* Confirm Button */}
                <Form.Item>
                  <Button size='large' type="primary" htmlType="submit" className="w-full mx-auto py-4">
                    Xác nhận đặt khám
                  </Button>
                </Form.Item>

                {/* Terms Agreement */}
                <p className="text-sm text-center mt-2">
                  Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với <a href="#" className="text-blue-500 underline">Điều khoản sử dụng</a> của Wellmeet.
                </p>
              </Form>
            </Card>
          </ConfigProvider>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        title="Thanh Toán"
        visible={isPaymentModalOpen}
        onCancel={() => setPaymentModalOpen(false)}
        onOk={handlePayment}
        okText="Thanh toán"
        cancelText="Hủy"
      >
        <p><b>Số tiền:</b> {paymentInfo.amount.toLocaleString()} VND</p>
        <p><b>Mô tả đơn hàng:</b> {paymentInfo.orderDescription}</p>
        <p><b>ID Cuộc hẹn:</b> {paymentInfo.appointmentId}</p>
        {paymentUrl && (
          <p>
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
              Click here if you are not redirected automatically
            </a>
          </p>
        )}
      </Modal>
    </>
  );
};

export default BookingPage;
