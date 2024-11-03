import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Alert, notification, message } from "antd";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { useLoginUserMutation } from "../../services/authAPI";
import { setToken, setUser } from "../../slices/auth.slice";

const LoginForm = ({ handleFogot }) => {

  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLoginSuccess = (data) => {
    const user = data.data.user;
    const token = data.data.token;

    dispatch(setUser(user));
    dispatch(setToken(token));

    notification.success({
      message: "Đăng nhập thành công",
      duration: 2,
      description: (
        <div>
          Chào mừng {user.userName} <SmileOutlined />
        </div>
      ),
    });

    const from = user.role?.toUpperCase() === "ADMIN" ? "/admin" : location.state?.from || "/";
    navigate(from);
  };

  const handleLoginFailure = (error, email) => {
    if (error.data) {
      setError(error.data.message); 
    } else {
      setError("Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại!"); 
      notification.error({
        message: "Lỗi đăng nhập",
        description: "Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại!",
      });
    }

    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      const result = await loginUser({ email: values.email, password: values.password });
      console.log(result);
      if (result.data) {
        handleLoginSuccess(result.data);
      } else {
        handleLoginFailure(result.error, values.email);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      message.error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="form-container">
      <Form form={form} onFinish={handleSubmit}>
        {error && (
          <>
            <Alert message={error} type="error" showIcon />
            <br />
          </>
        )}
        <Form.Item
          style={{ marginBottom: '2rem' }}
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập Email của bạn" }]}
        >
          <Input placeholder="   Email" size="large" className="form-input" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu của bạn" }]}
        >
          <Input.Password
            placeholder="  Mật khẩu"
            size="large" className="form-input"
            prefix={<LockOutlined />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <p style={{ width: '100%', textAlign: 'end' }}><Link style={{ fontSize: '16px' }} onClick={handleFogot} > Quên mật khẩu</Link></p>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            size="large"
            className="w-full mt-6 h-14"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
