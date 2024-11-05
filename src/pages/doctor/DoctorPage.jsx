import React, { useState } from 'react';
import { Card, DatePicker, Layout, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { useGetAllDoctorQuery } from '../../services/doctorAPI';
import 'tailwindcss/tailwind.css';
import DoctorCardRender from './DoctorCardRender';
import CustomHeader from '../../components/Header/CustomHeader';
import CustomFooter from '../../components/Footer/CustomFooter';

const { RangePicker } = DatePicker;

const DoctorPage = () => {
  const { data: doctorData, isLoading, error } = useGetAllDoctorQuery();
  console.log(doctorData)


  if (isLoading) return <div className='flex justify-center items-center'><Skeleton/></div>;
  // if (error) return <p>Error loading doctors</p>;

  return (
    <Layout>
      <CustomHeader />
      <div className="p-8 flex flex-col justify-center items-center mt-[120px]">
        {doctorData?.data.map((doctor, index) => (
          <DoctorCardRender index={index} doctor={doctor} />
        ))}
      </div>
      <CustomFooter />
    </Layout>
  );
};

export default DoctorPage;
