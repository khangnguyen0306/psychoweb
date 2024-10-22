import React from 'react';
import { Row, Col, Layout, Image, Button, ConfigProvider } from 'antd';
import { useInView } from 'react-intersection-observer';
import Clinical from './../../../assets/image/tuvan.svg'
import Counseling from './../../../assets/image/counselling.svg'
import Marriage from './../../../assets/image/married.svg'
import Child from './../../../assets/image/siblings.svg'
import Brain from './../../../assets/image/brain.svg'
import team from './../../../assets/image/teamwork.svg'
import { RightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../utils/utils';
const services = [
    {
        title: 'Tâm lý học lâm sàng',
        description: 'Chẩn đoán và điều trị các rối loạn tâm lý bằng các phương pháp khoa học.',
        icon: Clinical
    },
    {
        title: 'Tư vấn tâm lý',
        description: 'Giúp bạn giải quyết các vấn đề cá nhân và phát triển bản thân.',
        icon: Counseling
    },
    {
        title: 'Liệu pháp hôn nhân và gia đình',
        description: 'Hỗ trợ các cặp vợ chồng và gia đình cải thiện mối quan hệ của họ.',
        icon: Marriage
    },
    {
        title: 'Tâm lý học trẻ em và thanh thiếu niên',
        description: 'Tâm lý học chuyên biệt dành cho trẻ em và thanh thiếu niên.',
        icon: Child
    },
    {
        title: 'Tâm lý thần kinh',
        description: 'Tập trung vào mối liên hệ giữa não và hành vi.',
        icon: Brain
    },
    {
        title: 'Liệu pháp nhóm',
        description: 'Liệu pháp trong môi trường nhóm để tạo sự hỗ trợ cộng đồng.',
        icon: team
    },
];

const Services = () => {


    return (
        <Layout>
            <div className="relative text-left mt-24 pb-60 pt-28 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(https://path/to/your/image.jpg)' }}>
                <div className="absolute inset-0 bg-white opacity-70 blur-sm"></div>
                <div className="relative z-10 ml-16">
                    <p className={`text-black text-xl mb-2 font-content pl-2 pb-8 tracking-wide transition-opacity duration-1000 `}>Dịch vụ của chúng tôi</p>
                    <p className={`text-black text-5xl mb-4 font-content tracking-wide transition-opacity duration-1000 `}>Các dịch vụ</p>
                    <p className={`font-light mb-4 text-5xl text-white transition-transform duration-1000 `}>
                        <span className='text-6xl text-[#0176d5] font-black'>Wellmeet cung cấp?</span>
                    </p>
                    <div className={`h-1 w-24 bg-blue-700 transition-transform duration-1000 `}></div>
                    <p className={`pt-10 font-content text-2xl w-3/4 leading-10 transition-transform duration-600 `}>Khám phá các dịch vụ sức khỏe tâm lý toàn diện của chúng tôi được thiết kế để hỗ trợ và nâng cao chất lượng cuộc sống của bạn.</p>
                </div>
                <motion.div
                    variants={fadeIn({ direction: 'right', duration: 0.6, space: 60 })}
                    initial="hidden"
                    whileInView={'show'}
                >
                    <Row justify={'center'} className='flex gap-14 pt-20'>
                        {services.slice(0, 3).map((service, index) => (
                            <Col key={index} md={6} xs={24}  >
                                <div className={`relative transition-opacity duration-1000 `}>
                                    <Image preview={false} width={"150px"} src={service.icon} />
                                    <div className='text-left text-black font-content text-lg min-h-[120px]'>
                                        <h3 className="text-2xl font-bold text-black pt-6 ">{service.title}</h3>
                                        <div className="h-1 w-16 bg-blue-700 my-2"></div>
                                        <p className="mt-4 w-4/5">{service.description}</p>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Button: {
                                                        defaultHoverBg: '#0176d5',
                                                        defaultHoverColor: '#fff'
                                                    }
                                                }
                                            }}
                                        >
                                            <Button
                                                iconPosition='end'
                                                icon={<RightOutlined />}
                                                style={{ border: '1px solid #0176d5' }}
                                                className='mt-5 text-blue-800 font-bold rounded-3xl'>
                                                Tìm hiểu thêm
                                            </Button>
                                        </ConfigProvider>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </motion.div>
                <motion.div
                    variants={fadeIn({ direction: 'left', duration: 0.6, space: 60 })}
                    initial="hidden"
                    whileInView={'show'}
                >
                    <Row justify={'center'} className='flex gap-14 pt-20'>
                        {services.slice(3, 6).map((service, index) => (
                            <Col key={index} md={6} xs={24}  >
                                <div className={`relative transition-opacity duration-1000 `}>
                                    <Image preview={false} width={"150px"} src={service.icon} />
                                    <div className='text-left text-black font-content text-lg min-h-[120px]'>
                                        <h3 className="text-2xl font-bold text-black pt-6 ">{service.title}</h3>
                                        <div className="h-1 w-16 bg-blue-700 my-2"></div>
                                        <p className="mt-4 w-4/5">{service.description}</p>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Button: {
                                                        defaultHoverBg: '#0176d5',
                                                        defaultHoverColor: '#fff'
                                                    }
                                                }
                                            }}
                                        >
                                            <Button
                                                iconPosition='end'
                                                icon={<RightOutlined />}
                                                style={{ border: '1px solid #0176d5' }}
                                                className='mt-5 text-blue-800 font-bold rounded-3xl'>
                                                Tìm hiểu thêm
                                            </Button>
                                        </ConfigProvider>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Services;
