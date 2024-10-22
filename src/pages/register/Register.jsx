import { Button, Col, DatePicker, Form, Image, Input, Layout, Radio, Row, Space, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { useAddUserMutation } from '../../services/userAPI';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Register.scss'
import imager from '../../assets/image/image-login.jpg';
import { validationPatterns } from '../../utils/utils';
import { useRegisterUserMutation } from '../../services/authAPI';
import dayjs from 'dayjs';


const Register = () => {

  const [form] = Form.useForm();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // const { addUser } = useAddUserMutation();
    values.role = "USER"
    try {
      const user = await registerUser(values);
      // console.log(user.error.data.message);
      if (user.error) {
        message.error(user.error.data.message);
        return;
      }
      message.success("Tạo tài khoản thành công !");
      form.resetFields();
      navigate("/login");
      console.log(user);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout className='register-layout'>

      <Row className='row-layout' justify={'space-between'}>
        <Col >
          <div className='content-layout-register '>
            <div className='form-register'>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="title-login">Đăng ký</h2>
              </div>
              <Form form={form} onFinish={handleSubmit}>
                {/* <Form form={form}> */}
                <Form.Item
                  hasFeedback
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      pattern: validationPatterns.email.pattern,
                      message: validationPatterns.email.message,
                    },
                  ]}
                >
                  <Input type="" placeholder="Email" className="form-input" />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Họ và Tên"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      pattern: validationPatterns.name.pattern,
                      message: validationPatterns.name.message,
                    },

                  ]}
                >
                  <Input type="" placeholder="Họ và Tên" className="form-input" />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      //     pattern: validationPatterns.name.pattern,
                      //     message: validationPatterns.name.message,
                    },

                  ]}
                >
                  <Input type="" placeholder="Địa chỉ" className="form-input" />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Số điện thoại"
                  name="phonenumber"
                  rules={[
                    {
                      required: true,
                      pattern: validationPatterns.phoneNumber.pattern,
                      message: validationPatterns.phoneNumber.message,
                    },
                  ]}
                >
                  <Input type="" placeholder="Số điện thoại" className="form-input" />
                </Form.Item>

                <Form.Item
                  hasFeedback
                  label="Giới tính"
                  name="gender"
                  rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
                >
                  <Radio.Group>
                    <Radio value={"Male"}>Nam</Radio>
                    <Radio value={"Female"}>Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Ngày sinh"
                  name="dateOfBirth"
                  rules={[
                    // { required: true, message: "Vui lòng chọn ngày sinh của bạn!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value) {
                          return Promise.reject(new Error("Vui lòng chọn ngày sinh hợp lệ!"));
                        }
                        const selectedYear = value.year();
                        const nowYear = new Date().getFullYear();
                        const yearChecked = nowYear - selectedYear;
                        if (yearChecked >= 18 && yearChecked <= 100) {
                          return Promise.resolve();
                        } else {
                          if (yearChecked < 18) {
                            return Promise.reject(new Error("Bạn phải ít nhất 18 tuổi!"));
                          } else if (yearChecked > 100) {
                            return Promise.reject(new Error("Tuổi không hợp lệ! Vui lòng chọn ngày sinh hợp lệ."));
                          }
                        }
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    onChange={(date, dateString) => {
                      if (dateString) {
                        const formattedDate = dayjs(dateString, 'DD/MM/YYYY');
                        form.setFieldsValue({ dob: formattedDate });
                      }
                    }}
                    onBlur={() => {
                      const value = form.getFieldValue('dob');
                      if (value && dayjs(value, 'DD/MM/YYYY').isValid()) {
                        form.setFieldsValue({ dob: dayjs(value, 'DD/MM/YYYY') });
                      }
                    }}
                  />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      pattern: validationPatterns.password.pattern,
                      message: validationPatterns.password.message

                    }
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu" className="form-input"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Nhập lại mật khẩu"
                  name="retypePassword"
                  rules={[
                    { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Nhập lại mật khẩu"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item>
                  {/* {!isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
                      <button
                        type="primary"
                        htmlType="submit"
                        className="submit-btn"
                      >
                        Đăng ký
                      </button>

                      <div style={{ marginLeft: '2rem' }}>
                        <span>Đã có tài khoản?</span>
                        <Link to={"/login"}><span style={{ fontSize: '16px', marginLeft: '16px' }}>Đăng nhập</span> </Link>
                      </div>

                    </div>

                  ) : ( */}
                  <div className='flex items-center pt-6 mt-1'>
                    <Button className="w-36  h-14" type='primary' loading={isLoading} htmlType='submit' >Đăng ký</Button>

                    <div style={{ marginLeft: '2rem' }}>
                      <span>Đã có tài khoản?</span>
                      <Link to={"/login"}><span style={{ fontSize: '16px', marginLeft: '16px' }}>Đăng nhập</span> </Link>
                    </div>
                  </div>
                  {/* )} */}
                </Form.Item>
              </Form>
            </div>

          </div>
        </Col>
        <Col>
          <div className='image-register'>
            <Image preview={false} src={imager} />
          </div></Col>
      </Row>

    </Layout>
  )
}

export default Register
