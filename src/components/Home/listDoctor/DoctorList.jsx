import React from 'react';
import { useGetAllDoctorQuery } from '../../../services/doctorAPI';
import { Layout } from 'antd';
import DoctorCard from './DoctorCard';
import { useInView } from 'react-intersection-observer';

const DoctorList = () => {
    // Use the query hook to fetch data
    const { data: doctors, isLoading, error } = useGetAllDoctorQuery();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });
    console.log('In view:', inView);
    console.log(doctors)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {error.message}</div>;

    return (
        <Layout className=' pb-40'>
            <div className='text-center mt-[90px] '>
                <p className='text-gray-900 text-xl mb-2 font-content tracking-wide'>Get to know your psycholist</p>
                <p className='text-blue-700'>_________</p>
                <p className='font-content text-6xl pt-5 tracking-wider'>We're here to</p>
                <p className='font-bold text-7xl p-5 pt-4 text-blue-main font-black'>help you feel better</p>
            </div>

            <div
                ref={ref}
                className={`flex justify-between gap-10 pr-10 pl-10 mt-10 transition-opacity duration-1000 ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}>
                {doctors.slice(0, 3).map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </Layout>
    );
};

export default DoctorList;
