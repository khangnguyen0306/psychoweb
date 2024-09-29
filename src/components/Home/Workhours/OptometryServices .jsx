import React from 'react';
import { EyeOutlined, ClockCircleOutlined, AppstoreOutlined, FormOutlined } from '@ant-design/icons';
import './OptometryServices.scss';
import { Button, Col, Image, Row } from 'antd';
import assesment from './../../../assets/image/assessment.svg'
import adjustment from './../../../assets/image/ajustment.svg'
import coordinate from './../../../assets/image/coordinate.svg'
import counsellor from './../../../assets/image/counsellor.svg'
import reatement from './../../../assets/image/reatement.svg'
import { useInView } from 'react-intersection-observer';
import suopport from './../../../assets/image/suopport.svg'
import { motion } from 'framer-motion';
import { fadeIn } from '../../../utils/utils';
const OptometryServices = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
    });
    console.log('In view:', inView);
    return (
        <div
            ref={ref}
            className={`opcontainer ${inView ? 'fade-in' : ''}`}
        >
            <motion.div
                variants={fadeIn({ direction: 'right', duration: 0.6, space: 60 })}
                initial="hidden"
                whileInView={'show'}
            >
                <div className="opheader">
                    <div className='opvision'>
                        <p >Your vision is our vision</p>
                        <p>___________</p>
                    </div>
                    <div className='optitle'>
                        <p>Comprehensive Psychological Services</p>
                        <p>Psychological Assessment</p>
                    </div>
                </div>
            </motion.div>
            <Row justify={'center'} className='content-opcontainer'>
                <motion.div
                    variants={fadeIn({ direction: 'up', duration: 0.6, space: 60 })}
                    initial="hidden"
                    whileInView={'show'}
                    className='w-full flex'
                >
                    <Col md={8} xs={24}>
                        <div className="services">
                            <div className="service-item">
                                <div className='op-icon-container' >
                                    <Image preview={false} src={assesment} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Psychological Assessment</p>
                                    <p>Harness global multimedia collaboration to share ideas with support products. Continuously explore superior opportunities.</p>
                                </div>
                            </div>

                            <div className="service-item">
                                <div className='op-icon-container' style={{ padding: '10px' }}>
                                    <Image preview={false} src={adjustment} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Psychological Adjustment</p>
                                    <p>Seamlessly apply key performance indicators to maximize effectiveness. Stay focused while conducting in-depth analysis.</p>
                                </div>
                            </div>

                            <div className="service-item">
                                <div className='op-icon-container' style={{ padding: '22px' }}>
                                    <Image preview={false} src={coordinate} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Coordination Evaluation</p>
                                    <p>Identify potential opportunities to determine value-added activities for beta testing. Overcome digital barriers with additional strategies.</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} xs={24}>
                        <div className="services">
                            <div className="service-item">
                                <div className='op-icon-container'>
                                    <Image preview={false} src={reatement} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Diagnosis and Treatment</p>
                                    <p>Utilize agile frameworks to provide robust overviews for high-level strategies. Employ iterative approaches to strategic planning.</p>
                                </div>
                            </div>

                            <div className="service-item">
                                <div className='op-icon-container'>
                                    <Image preview={false} src={suopport} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Therapeutic Support</p>
                                    <p>Cultivate personalized customer service with innovative ideas. Dynamically manage resource-leveling customer service.</p>
                                </div>
                            </div>

                            <div className="service-item">
                                <div className='op-icon-container'>
                                    <Image preview={false} src={counsellor} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Personal Counseling</p>
                                    <p>Effectively manage collaborative channels while engaging with virtual services. Objectively measure scalable metrics while delivering proactive services.</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} xs={24}>
                        <div className="working-hours">
                            <div className='wk-container'>
                                <p className='wk-title'>Working hours</p>
                                <p className='wk-content'>If you wich to book an appointment with Medicare, please choose any of the days shown below, and bok with the desirec optometryst.</p>
                            </div>
                            <div className="wk-hours">
                                <div className="wk-hours-container">
                                    <span className="day">Monday</span>
                                    <span className="time">8AM - 7PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>BOOK</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Tuesday</span>
                                    <span className="time">8AM - 5PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>BOOK</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Wednesday</span>
                                    <span className="time">8AM - 5PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>BOOK</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Thursday</span>
                                    <span className="time">8AM - 7PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>BOOK</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Friday</span>
                                    <span className="time">8AM - 7PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>BOOK</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Saturday - Sunday</span>
                                    <span className="time">Closed</span>
                                </div>
                                <div className="wk-hours-container">
                                    <Button
                                        className="book-button"
                                        type='primary'
                                        iconPosition='end'
                                        style={{
                                            padding: '25px 40px',
                                            fontSize: '14px',
                                            marginTop: '20px'
                                        }}
                                    >View more of our services</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </motion.div>
            </Row>
        </div>
    );
};

export default OptometryServices;
