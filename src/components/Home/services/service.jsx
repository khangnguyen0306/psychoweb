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
const services = [
    {
        title: 'Clinical Psychology',
        description: 'Diagnosing and treating psychological disorders using scientific methods.',
        icon: Clinical
    },
    {
        title: 'Psychological Counseling',
        description: 'Helping you resolve personal issues and develop yourself.',
        icon: Counseling
    },
    {
        title: 'Marriage and Family Therapy',
        description: 'Supporting couples and families in improving their relationships.',
        icon: Marriage
    },
    {
        title: 'Child and Adolescent Psychology',
        description: 'Specialized psychology for children and adolescents.',
        icon: Child
    },
    {
        title: 'Neuropsychology',
        description: 'Focusing on the connection between the brain and behavior.',
        icon: Brain
    },
    {
        title: 'Group Therapy',
        description: 'Therapy in a group setting to foster community support.',
        icon: team
    },
];

const Services = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <Layout>
            <div className="relative text-left mt-24 pb-60 pt-28 bg-cover bg-center bg-no-repeat" ref={ref}
                style={{ backgroundImage: 'url(https://path/to/your/image.jpg)' }}>
                <div className="absolute inset-0 bg-white opacity-70 blur-sm"></div>
                <div className="relative z-10 ml-16">
                    <p className={`text-black text-xl mb-2 font-content pl-2 pb-8 tracking-wide transition-opacity duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Our services</p>
                    <p className={`text-black text-5xl mb-4 font-content tracking-wide transition-opacity duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>What services</p>
                    <p className={`font-light mb-4 text-5xl text-white transition-transform duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <span className='text-6xl text-[#0176d5] font-black'>Wellmeet offers?</span>
                    </p>
                    <div className={`h-1 w-24 bg-blue-700 transition-transform duration-1000 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}></div>
                    <p className={`pt-10 font-content text-2xl w-3/4 leading-10 transition-transform duration-600 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>Discover our comprehensive range of mental health services designed to support your well-being and enhance your quality of life.</p>
                </div>
                <Row justify={'center'} className='flex gap-14 pt-20'>
                    {services.map((service, index) => (
                        <Col key={index} md={6} xs={24}  >
                            <div className={`relative transition-opacity duration-1000  ${inView ? 'opacity-100' : 'opacity-0'}`}>
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
                                            Find out more
                                        </Button>
                                    </ConfigProvider>
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
