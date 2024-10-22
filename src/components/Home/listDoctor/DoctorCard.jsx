import React from 'react';
import { DoubleRightOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { Button, Card, Image } from 'antd';

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="p-4 shadow-lg hover:shadow-cyan-200">
      <Image
        src={doctor.imageUrl}
        alt={doctor.name}
        className="w-[200px] h-12 mx-auto"
      />
      <div className='w-[350px]'>
        <p className=" text-blue-500 mt-4 font-content text-lg">{doctor.degree}</p>
        <hr className="my-2 w-12 border-blue-500" />
        <p className=" text-xl font-bold pt-1 pb-2">{doctor.name}</p>
        <p className="text-left text-gray-500">{doctor.introduction}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4 mt-2">
          <Button 
            icon={<FacebookOutlined />}
            className="bg-blue-600 text-white"
          />
          <Button
            icon={<InstagramOutlined />}
            className="bg-pink-500 text-white"
          />
        </div>
        <Button className="bg-blue-500 text-white">Đọc Thêm <DoubleRightOutlined /></Button>
      </div>
    </Card>
  );
};

export default DoctorCard;
