import { Button, Col, Divider, Form, Image, Input, Layout, message, Row, Space } from "antd";
import "./../../components/login/Login.scss";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { BackwardOutlined, LoadingOutlined } from "@ant-design/icons";
import imager from '../../assets/image/image-login.jpg';
import LoginForm from "../../components/login/FormLogin.jsx";
import { selectCurrentToken } from "../../slices/auth.slice.js";
import { useResetPasswordMutation, useVerifyOtpMutation } from "../../services/authAPI.js";
import { useForm } from "antd/es/form/Form.js";
import { validationPatterns } from "../../utils/utils.js";

function Login() {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const [isSendOTP, setIsSendOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSendOTP, setIsLoadingSendOTP] = useState(false);
  const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);
  const [isFogotPasswords, setIsFogotPasswords] = useState(false);
  const [sendOtp, { isLoadingSending }] = useVerifyOtpMutation();
  const [resetPas] = useResetPasswordMutation();
  const [form] = useForm();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const setFogotPassword = () => {
    setIsFogotPasswords(!isFogotPasswords);
  };

  const handleSendOtp = async (values) => {
    setIsLoadingSendOTP(true);
    try {
      const response = await sendOtp(values).unwrap();

      if (response.code === 200) {
        setIsSendOTP(true);
      }
    } catch (error) {

    } finally {
      setIsLoadingSendOTP(false);
    }
  };

  const handleResetPass = async (values) => {
    setIsLoadingResetPassword(true);
    try {
      const response = await resetPas({ token: values.otp, newPassword: values.newPassword }).unwrap();
      console.log(response);
      message.success("Đặt lại mật khẩu thành công!");
      setFogotPassword();
      form.resetFields();
    } catch (error) {
      if (error.status == 400) {
        message.error("OTP không đúng hoặc đã hết hạn !");
      }
      console.error("Đặt lại mật khẩu không thành công:", error);
    } finally {
      setIsLoadingResetPassword(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <Layout className="Layout-login">
            <div className="login-page">
              <Row>
                <Col span={12} style={{ padding: '6rem 12rem' }}>
                  {isFogotPasswords ? (
                    <>
                      <div className="p-[43px] w-full">
                        <Button className="absolute left-7 top-16" icon={<BackwardOutlined />} onClick={setFogotPassword}>Quay lại</Button>
                        <h1 className="title-login">Quên mật khẩu</h1>
                        <div className="form-login">

                          {!isSendOTP ? (
                            <Form onFinish={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <Form.Item
                                style={{ padding: '10px 0px' }}
                                name="email"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Nhập vào Email !'
                                  },
                                  {
                                    type: 'email',
                                    message: 'Địa chỉ email không hợp lệ!',
                                  },
                                ]}
                              >
                                <Input placeholder="Email" />
                              </Form.Item>

                              <Button type="primary" htmlType="submit" loading={isLoadingSendOTP}>
                                Gửi mã OTP
                              </Button>
                            </Form>
                          ) : (

                            <Form onFinish={handleResetPass} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <Form.Item
                                name="otp"
                                rules={[{ required: true, message: 'Vui lòng nhập OTP!' }]}
                              >
                                <Input placeholder="Nhập OTP" />
                              </Form.Item>
                              <Form.Item
                                name="newPassword"
                                rules={[
                                  {
                                    required: true,
                                    pattern: validationPatterns.password.pattern,
                                    message: validationPatterns.password.message

                                  }
                                ]}
                              >
                                <Input.Password placeholder="Mật khẩu mới" />
                              </Form.Item>
                              <Form.Item
                                name="confirmPassword"
                                dependencies={['newPassword']}
                                hasFeedback
                                rules={[
                                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(new Error('Hai mật khẩu không khớp!'));
                                    },
                                  }),
                                ]}
                              >
                                <Input.Password placeholder="Xác nhận mật khẩu" />
                              </Form.Item>

                              <Button type="primary" htmlType="submit" loading={isLoadingResetPassword}>
                                Xác minh OTP và đặt lại mật khẩu
                              </Button>
                            </Form>
                          )}

                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="title-login">Đăng nhập</h1>
                      <div className="form-login">
                        <LoginForm handleFogot={setFogotPassword} />
                        <Divider plain style={{ padding: '15px' }}><span>Hoặc</span></Divider>

                        <div style={{ textAlign: 'center' }}>
                          <p>Bạn chưa có tài khoản? <Link style={{ fontSize: '16px', padding: '10px' }} to={"/register"}> Đăng ký</Link></p>
                        </div>
                      </div>
                    </>
                  )}
                </Col>
                <Col span={12} className="image-login">
                  <Image preview={false} src={imager} style={{ height: '100vh' }} />
                </Col>
              </Row>
            </div>
          </Layout>
        </>
      )}
    </>
  );
}

export default Login;
