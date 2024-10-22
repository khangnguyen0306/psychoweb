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
                        <p >Tầm nhìn của bạn là tầm nhìn của chúng tôi</p>
                        <p>___________</p>
                    </div>
                    <div className='optitle'>
                        <p>Dịch vụ Tâm lý Toàn diện</p>
                        <p>Đánh giá Tâm lý</p>
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
                                    <p className='op-content-title'>Đánh giá Tâm lý</p>
                                    <p className='text-sm'>Hợp tác đa phương tiện toàn cầu để chia sẻ ý tưởng với các sản phẩm hỗ trợ. Khám phá các cơ hội vượt trội liên tục.</p>
                                </div>
                            </div>

                            <div className="service-item">
                                <div className='op-icon-container' style={{ padding: '15px' }}>
                                    <Image preview={false} src={adjustment} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Điều chỉnh Tâm lý</p>
                                    <p className='text-sm'>Áp dụng các chỉ số hiệu suất chính một cách liền mạch để tối đa hóa hiệu quả. Giữ tập trung trong khi tiến hành phân tích sâu sắc.</p>
                                </div>
                            </div>

                            <div className="service-item">
                                <div className='op-icon-container' style={{ padding: '22px' }}>
                                    <Image preview={false} src={coordinate} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Đánh giá Phối hợp</p>
                                    <p className='text-sm'>Xác định các cơ hội tiềm năng để xác định các hoạt động mang lại giá trị gia tăng cho thử nghiệm beta. Vượt qua rào cản kỹ thuật số với các chiến lược bổ sung.</p>
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
                                    <p className='op-content-title'>Chẩn đoán và Điều trị</p>
                                    <p className='text-sm'>Sử dụng các khung làm việc linh hoạt để cung cấp cái nhìn tổng quan mạnh mẽ về các chiến lược cấp cao. Áp dụng các phương pháp tiếp cận lặp lại để lập kế hoạch chiến lược.</p>
                                </div>
                            </div>

                            <div className="service-item">
                                <div className='op-icon-container'>
                                    <Image preview={false} src={suopport} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Hỗ trợ trị liệu</p>
                                    <p className='text-sm'>Phát triển dịch vụ khách hàng cá nhân hóa với các ý tưởng sáng tạo. Quản lý linh hoạt dịch vụ khách hàng ở cấp độ tài nguyên.</p>
                                </div>
                            </div>

                            <div className="service-item">
                                <div className='op-icon-container'>
                                    <Image preview={false} src={counsellor} className='image-icon' />
                                </div>
                                <div className='op-content-container'>
                                    <p className='op-content-title'>Tư vấn Cá nhân</p>
                                    <p className='text-sm'>Quản lý hiệu quả các kênh hợp tác trong khi tham gia với các dịch vụ ảo. Đo lường các chỉ số có thể mở rộng một cách khách quan trong khi cung cấp dịch vụ chủ động.</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} xs={24}>
                        <div className="working-hours">
                            <div className='wk-container'>
                                <p className='wk-title'>Giờ làm việc</p>
                                <p className='wk-content'>Nếu bạn muốn đặt lịch hẹn với Medicare, vui lòng chọn bất kỳ ngày nào hiển thị bên dưới và đặt lịch với bác sĩ tâm lý mong muốn.</p>
                            </div>
                            <div className="wk-hours">
                                <div className="wk-hours-container">
                                    <span className="day">Thứ Hai</span>
                                    <span className="time">8AM - 7PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>ĐẶT LỊCH</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Thứ Ba</span>
                                    <span className="time">8AM - 5PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>ĐẶT LỊCH</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Thứ Tư</span>
                                    <span className="time">8AM - 5PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>ĐẶT LỊCH</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Thứ Năm</span>
                                    <span className="time">8AM - 7PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>ĐẶT LỊCH</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Thứ Sáu</span>
                                    <span className="time">8AM - 7PM</span>
                                    <Button className="book-button" type='primary' icon={<ClockCircleOutlined />} iconPosition='end'>ĐẶT LỊCH</Button>
                                </div>
                                <div className="wk-hours-container">
                                    <span className="day">Thứ Bảy - Chủ Nhật</span>
                                    <span className="time">Đóng cửa</span>
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
                                    >Xem thêm dịch vụ của chúng tôi</Button>
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
