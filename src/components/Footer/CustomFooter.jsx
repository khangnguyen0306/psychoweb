import React from "react";
import { Layout, Row, Col, Divider, Image, Input, Button } from "antd";
import logo from './../../assets/image/logo.svg';
const { Footer } = Layout;
import './Footer.scss';
import { FacebookFilled, InstagramFilled, PhoneFilled, SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function CustomFooter() {
  return (
    <Footer style={{ backgroundColor: "#f0f2f5", padding: "20px 50px 80px 50px" }}>
      <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #d9d9db', marginBottom: '40px' }}>
        <Image style={{ height: '160px' }} src={logo} preview={false} />
      </div>
      <Row justify={"space-between"} style={{ margin: '0 100px' }}>
        <Col span={5}>
          <div className="containerF">
            <p className="title">Liên hệ với chúng tôi</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <p><PhoneFilled style={{ fontSize: '22px', color: '#fff', padding: '12px', backgroundColor: '#727375', borderRadius: '50%' }} /></p>
              </div>
              <div>
                <p className="subtitle">Gọi cho chúng tôi</p>
                <p>091196818</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
              <div>
                <p><SendOutlined style={{ fontSize: '22px', color: '#fff', padding: '12px', backgroundColor: '#1c4c93 ', borderRadius: '50%' }} /></p>
              </div>
              <div>
                <p className="subtitle">Gửi email cho chúng tôi</p>
                <p>wellmeet@gmail.com</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="containerF">
            <p className="title">Về chúng tôi</p>
            <Row>
              <Col span={12} style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: '600' }}>
                <Link>Về chúng tôi</Link>
                <Link>Dịch vụ của chúng tôi</Link>
                <Link>Địa điểm</Link>
                <Link>Cuộc hẹn</Link>
                <Link>Blog</Link>
                <Link>Cửa hàng</Link>
              </Col>
              <Col span={12} style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: '600' }}>
                <Link>Khám mắt</Link>
                <Link>Kính áp tròng</Link>
                <Link>Điều trị mắt</Link>
                <Link>Lasik</Link>
                <Link>Phối hợp</Link>
                <Link>Kính</Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={5}>
          <div className="containerF">
            <h4 className="title">Đăng ký</h4>
            <p style={{ width: '280px' }} className="content">
              Đăng ký nhận bản tin Wellmeet để nhận tất cả các ưu đãi và giảm giá từ phòng khám mắt Medicare.
            </p>
            <Input style={{ height: '45px', marginTop: '10px' }} placeholder="Nhập địa chỉ email của bạn" />
            <Button type="primary" style={{ backgroundColor: '#1c4c93', height: '45px', width: '120px', marginTop: '20px' }}><p style={{fontWeight:'600'}}>Đăng ký</p></Button>
          </div>
        </Col>
        <Col span={5}>
          <div className="containerF">
            <p className="title">Mạng xã hội</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div>
                <p><FacebookFilled style={{ fontSize: '22px', color: '#fff', padding: '12px', backgroundColor: '#0866ff', borderRadius: '50%' }} /></p>
              </div>
              <div>
                <p className="subtitle">Facebook</p>
                <p>https://www.facebook.com/wellmeet</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
              <div>
                <p><InstagramFilled style={{ fontSize: '22px', color: '#fff', padding: '12px', backgroundColor: '#ff0268 ', borderRadius: '50%' }} /></p>
              </div>
              <div>
                <p className="subtitle">Instagram</p>
                <p>wellmeet@gmail.com</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Footer>
  );
}

export default CustomFooter;
