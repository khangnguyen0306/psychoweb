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
        <Layout >
            <div className="relative text-left  mt-[90px] pb-60 pt-28 bg-cover bg-center bg-no-repeat" ref={ref}
                style={{ backgroundImage: 'url(https://path/to/your/image.jpg)' }}>
                <div className="absolute inset-0 bg-slate-200  opacity-70 blur-sm"></div>
                <div className="relative z-10 pl-[10%]">
                    <p className={`text-black text-xl mb-2 font-content pl-2 pb-4 tracking-wide transition-opacity duration-1000 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>Our services</p>
                    <p className={`text-black text-7xl mb-2 font-content tracking-wide transition-opacity duration-1000 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>What services</p>

                    <p className={`font-light text-7xl  text-white transition-transform duration-1000 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>
                        <span className='text-7xl  text-[#0176d5] font-black'>Wellmeet offers?</span>

                    </p>
                    <p className={`text-blue-700 transition-transform duration-1000 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>  _________</p>
                    <p className={`pt-5 font-content text-2xl w-[65%] leading-10 transition-transform duration-600 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>Discover our comprehensive range of mental health services designed to support your well-being and enhance your quality of life.</p>
                </div>
                <Row justify={'center'} className='flex gap-14 pt-20'>
                    {services.map((service, index) => (
                        <Col key={index} md={6} xs={24}  >
                            <div className={`relative transition-opacity duration-1000  ${inView ? 'opacity-100' : 'opacity-0'}`}>
                                <Image preview={false} width={"150px"} src={service.icon} />
                                <div className='text-left text-black font-content text-lg min-h-[120px]'>
                                    <h3 className="text-2xl font-bold text-black pt-6 ">{service.title}</h3>
                                    <div className="text-blue-700 h-4">_________</div>
                                    <p className="mt-4 w-[80%]">{service.description}</p>
                                    <ConfigProvider
                                    theme={{
                                        components:{
                                            Button:{
                                                defaultHoverBg:'#0176d5',
                                                defaultHoverColor:'#fff'
                                            }
                                        }
                                    }}
                                    >
                                        <Button icon={<RightOutlined />}
                                            style={{ border: '1px solid blue' }}
                                            iconPosition='end'
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
