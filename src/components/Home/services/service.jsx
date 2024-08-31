import React from 'react';
import { Row, Col, Layout } from 'antd';
import { useInView } from 'react-intersection-observer';

const services = [
    { title: 'Tâm lý học lâm sàng', description: 'Chẩn đoán và điều trị các rối loạn tâm lý bằng phương pháp khoa học.' },
    { title: 'Tư vấn tâm lý', description: 'Giúp bạn giải quyết các vấn đề cá nhân và phát triển bản thân.' },
    { title: 'Trị liệu hôn nhân và gia đình', description: 'Hỗ trợ các cặp đôi và gia đình trong việc cải thiện mối quan hệ.' },
    { title: 'Tâm lý học trẻ em và thanh thiếu niên', description: 'Chuyên tâm lý học cho trẻ em và thanh thiếu niên.' },
    { title: 'Tâm lý học thần kinh', description: 'Tập trung vào mối liên hệ giữa não bộ và hành vi.' },
    { title: 'Trị liệu nhóm', description: 'Trị liệu trong môi trường nhóm để tạo ra sự hỗ trợ từ cộng đồng.' },
];

const Services = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <Layout className='pb-40'>
            <div className="relative text-left  mt-[90px] pb-60 pt-28 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(https://path/to/your/image.jpg)' }}>
                <div className="absolute inset-0 bg-slate-200  opacity-70 blur-sm"></div>
                <div className="relative z-10 pl-[10%]">
                    <p className={`text-black text-xl mb-2 font-content pl-2 pb-4 tracking-wide transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>Our services</p>
                    <p className={`text-black text-7xl mb-2 font-content tracking-wide transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>What services</p>

                    <p className={`font-light text-7xl  text-white transition-transform duration-1000 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>
                        <span className='text-7xl  text-[#0176d5] font-black'>Wellmeet offers?</span>

                    </p>
                    <p className={`text-blue-700 transition-transform duration-1000 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>  _________</p>
                </div>
                <Row justify={'center'} className='flex gap-14 pt-24'>
                    {services.map((service, index) => (
                        <Col key={index} md={6} xs={24} ref={ref}>
                            <div className={`relative transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                                <blockquote className="absolute top-0 left-0 text-[120px] text-gray-200 opacity-70 blur-sm -translate-x-10 -translate-y-10">
                                    “
                                </blockquote>
                                <div className='text-left text-slate-100 font-content text-lg min-h-[120px]'>
                                    <h3 className="text-2xl font-bold text-blue-400">{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </Layout>
    );
};

export default Services;
