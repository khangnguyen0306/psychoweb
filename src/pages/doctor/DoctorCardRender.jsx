import React, { useState, useEffect } from 'react';
import { Card, DatePicker, Button, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'tailwindcss/tailwind.css';

const DoctorCardRender = ({ doctor }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availableTimes, setAvailableTimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctor.timeSlots && selectedDate) {
      // Filter available times for the selected date
      const filteredTimes = doctor.timeSlots
        .filter(slot => dayjs(slot.slotDate).isSame(selectedDate, 'day'))
        .map(slot => ({
          time: `${dayjs(slot.startTime, 'HH:mm').format('HH:mm')} - ${dayjs(slot.endTime, 'HH:mm').format('HH:mm')}`,
          timeSlotId: slot.timeSlotId,
        }));
      setAvailableTimes(filteredTimes);
    }
  }, [doctor.timeSlots, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time, timeSlotId) => {
    const formattedDate = selectedDate.format("YYYY/MM/DD");
    navigate(`/booking?date=${formattedDate}&time=${time}&bsId=${doctor.id}&timeSlotId=${timeSlotId}`);
  };

  return (
    <Card className="p-4 shadow-lg w-[70%] mb-6">
      <div className="flex justify-between flex-col md:flex-row">
        {/* Doctor's Info */}
        <div className="flex-1 pr-8 mb-4 md:mb-0">
          <div className="flex items-start mb-4">
            <Image
              width={150}
              height={150}
              src={doctor.userImage || 'https://via.placeholder.com/150'}
              alt="Doctor"
              className="rounded-full mr-4 shadow-2xl"
            />
            <div className="ml-8 mt-2 flex flex-col gap-1">
              <Link to={`/doctor/${doctor.userId}`}>
                <h2 className="text-2xl font-bold text-[#379da8] hover:text-[#576eee] hover:drop-shadow-xl hover:shadow-cyan-500">
                  {doctor.fullname}
                </h2>
              </Link>
              <p className="text-xl font-bold py-2">
                Giá Khám: <span className='text-red-400'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(doctor.consultationFee)}</span>
              </p>

              <p className="text-sm">{doctor.specialization}</p>
              <p className="text-gray-500">{doctor.bio}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-10">
            <p className="text-md"><b>Email:</b> {doctor.email}</p>
            <p className="text-md"><b>Phone:</b> {doctor.phonenumber}</p>
            <p className="text-md"><b>Address:</b> {doctor.location}</p>
          </div>
        </div>

        {/* Appointment Schedule */}
        <div className="w-full md:w-1/3 flex flex-col items-start">
          <h3 className="text-base font-semibold mb-2">Lịch khám</h3>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full mb-4"
            format="DD / MM / YYYY"
          // disabledDate={(current) => current && current < dayjs().startOf('day')}  // cấm chọn ngày quá khứ data kh có disable trước mai mốt có bỏ cmt
          />
          <h3 className="text-base font-semibold mb-2">Giờ khám</h3>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {availableTimes.length > 0 ? (
              availableTimes.map((slot, index) => (
                <Button key={index} type="primary" className="w-full" onClick={() => handleTimeClick(slot.time, slot.timeSlotId)}>
                  {slot.time}
                </Button>
              ))
            ) : (
              <p className="text-gray-500">No available times for this date.</p>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold">Địa chỉ phòng khám</h4>
            <p className="text-sm">{doctor.location}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCardRender;
