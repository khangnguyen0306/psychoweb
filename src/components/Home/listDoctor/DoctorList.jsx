import React from 'react';
import { useGetAllDoctorQuery } from '../../../services/doctorAPI';
import { Layout } from 'antd';
import DoctorCard from './DoctorCard';
import { useInView } from 'react-intersection-observer';

const DoctorList = () => {
    // Sử dụng hook truy vấn để lấy dữ liệu
    const { data: doctors, isLoading, error } = useGetAllDoctorQuery();
    console.log(doctors)
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    if (isLoading) return <div>Đang tải...</div>;
    if (error) return <div>Đã xảy ra lỗi: {error.message}</div>;

    return (
        <Layout className='pb-40'>
            <div className='text-center mt-[90px]'>
                <p className='text-gray-900 text-xl mb-2 font-content tracking-wide'>Tìm hiểu về bác sĩ tâm lý của bạn</p>
                <p className='text-blue-700'>_________</p>
                <p className='font-content text-6xl pt-5 tracking-wider'>Chúng tôi ở đây để</p>
                <p className='font-bold text-7xl p-5 pt-4 text-blue-main font-black'>giúp bạn cảm thấy tốt hơn</p>
            </div>

            <div
                ref={ref}
                className={`flex justify-between gap-10 pr-10 pl-10 mt-10 transition-opacity duration-1000 ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}>
                {doctors.data.slice(0, 3).map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </Layout>
    );
};

export default DoctorList;
