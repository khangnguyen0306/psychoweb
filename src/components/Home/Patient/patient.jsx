import React, { useRef } from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { useInView } from 'react-intersection-observer';
import image from './../../../assets/image/1.jpg';
import { motion } from 'framer-motion';

const Patient = () => {
    // Use the query hook to fetch data
    const { ref: ref1, inView: inView1 } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const { ref: ref2, inView: inView2 } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });
    const { ref: ref3, inView: inView3 } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <Layout className='pb-40'>
            <div className="relative text-center mt-[90px] pb-60 pt-28 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${image})` }}>
                <div className="absolute inset-0 bg-black opacity-70 blur-sm"></div>
                <div className="relative z-10">
                    <p className={`text-white text-xl mb-2 font-content tracking-wide transition-opacity duration-1000 ${inView1 ? 'opacity-100' : 'opacity-0'}`}>A good words means a lot</p>
                    <div className={`h-1 w-24 bg-cyan-500 transition-transform duration-1000 mx-auto`}></div>
                    <p className={`font-light text-7xl p-5 pt-4 text-white transition-transform duration-1000 ${inView1 ? 'translate-y-0' : 'translate-y-10'}`}>Patient
                        <span className='font-bold text-7xl p-5 pt-4 text-blue-main font-black'>testimonials</span></p>
                </div>
                <Row justify={'center'} className='flex gap-14 pt-24'>
                    <Col md={6} xs={24}>
                        <div className={`relative transition-opacity duration-1000 ${inView1 ? 'opacity-100' : 'opacity-0'}`} ref={ref1}>
                            <blockquote className="absolute top-0 left-0 text-[170px] text-gray-200 opacity-70 blur-sm -translate-x-10 -translate-y-20">
                                “
                            </blockquote>
                            <div className='text-left text-slate-100 font-content text-lg min-h-[120px]'>
                                It's helpful to have a provider who is thorough both in the office visit and the follow-up contact.
                                I've already recommended this place to friends and family.
                            </div>
                            <p className='text-right text-lg font-bold pr-3 pt-3 text-blue-400'>Trong Khang</p>
                        </div>
                    </Col>
                    <Col md={6} xs={24}>
                        <div className={`relative transition-opacity duration-1000 ${inView1 ? 'opacity-100' : 'opacity-0'}`} ref={ref1}>
                            <blockquote className="absolute top-0 left-0 text-[170px] text-gray-200 opacity-70 blur-sm -translate-x-10 -translate-y-20">
                                “
                            </blockquote>
                            <div className='text-left text-slate-100 font-content text-lg min-h-[120px]'>
                                Not only do I have a better mentality, I am happier and more open, but I am also integrated into the community, and I am very happy about that.
                            </div>
                            <p className='text-right text-lg font-bold pr-3 pt-3 text-blue-400'>Trong Khang</p>
                        </div>
                    </Col>
                    <Col md={6} xs={24}>
                        <div className={`relative transition-opacity duration-1000 ${inView1 ? 'opacity-100' : 'opacity-0'}`} ref={ref1}>
                            <blockquote className="absolute top-0 left-0 text-[170px] text-gray-200 opacity-70 blur-sm -translate-x-10 -translate-y-20">
                                “
                            </blockquote>
                            <div className='text-left text-slate-100 font-content text-lg min-h-[120px]'>
                                The hours are great, and I didn’t have to wait long, what I also like about your office is that you are up-to-date with state-of-the-art equipment.
                            </div>
                            <p className='text-right text-lg font-bold pr-3 pt-3 text-blue-400'>Trong Khang</p>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className='flex justify-center align-middle ' >
                <Row className='flex gap-7 pt-16 pb-16 mt-[-100px] w-[80%] z-0 bg-slate-200 rounded-sm'
                    justify={'center'}
                    style={{ background: 'linear-gradient(to right, #7fca2d, #40b9ce, #1458bd)' }}
                >
                    <Col md={10} xs={12} className='mt-8'>
                        <div className={`transition-opacity duration-1000 ${inView2 ? 'opacity-100' : 'opacity-0'}`} ref={ref2}>
                            <p className='font-content text-4xl tracking-wide text-slate-100'>Looking forward</p>
                            <p className={`text-blue-700 transition-transform duration-1000 ${inView2 ? 'translate-y-0' : 'translate-y-10'}`}>______________</p>
                            <p className='font-content text-lg text-slate-50 pt-4'>Subscribe to Medicare newsletter now to get great discounts</p>
                        </div>
                    </Col>
                    <Col md={10} xs={12}>
                        <div className='flex flex-col'>
                            <p className={`text-slate-50 font-content text-md pb-5 transition-opacity duration-1000 ${inView2 ? 'opacity-100' : 'opacity-0'}`}>
                                Sign up for Medicare newsletter to receive all the new offers and discounts from Medicare clinic.
                                Discounts are only valid for our newsletter subscribers.
                            </p>
                            <div className="relative w-[80%] pt-2">
                                <input
                                    className="w-full p-3 text-base placeholder:text-base border border-transparent rounded-md 
                                    placeholder:text-slate-100
                                    text-slate-100
                                    focus:outline-none focus:border-transparent 
                                    bg-slate-100 bg-opacity-20
                                    focus:ring-2 focus:ring-cyan-100"
                                    placeholder="Type in your email address"
                                />
                            </div>
                            <Button className='mt-5 p-6 w-[25%] bg-gradient-to-r border-none from-[#bcc6d5] to-[#30c9e4] text-white font-bold rounded-md hover:from-[#1458bd] hover:via-[#40b9ce] hover:to-[#7fca2d]'>
                                Subscribe
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    );
};

export default Patient;
