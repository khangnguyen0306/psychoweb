import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Alert, notification, message } from "antd";
import "./Login.scss";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone, LockFilled, LockOutlined, SmileFilled, SmileOutlined, UserOutlined } from "@ant-design/icons";
import { useLoginUserMutation } from "../../services/authAPI";
import { setToken, setUser } from "../../slices/auth.slice";




const LoginForm = ({handleFogot}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();


  const handleLoginSuccess = (data) => {
    const user = data.data.user;
    const token = data.data.token;
    
    dispatch(setUser(user));
    dispatch(setToken(token));
    
    notification.success({
      message: "Login successfully",
      duration: 2,
      description: (
        <div>
          Welcome {user.userName} <SmileOutlined />
        </div>
      ),
    });
  
    const from = location.state?.from || "/";
    navigate(from);
  };
  
  const handleLoginFailure = (error, email) => {
    if (error.data) {
      message.error(error.data.message);

      // if (error.data.isBanned) {
      //   const userId = error.data.data.user.id;
      //   const bannedAccountId = error.data.bannedAccountId;

      //   console.log("User is banned, navigating to appeal page with state:", {
      //     email,
      //     bannedAccountId,
      //     userId,
      //   });

      //   navigate("/appeal", {
      //     state: {
      //       email,
      //       bannedAccountId,
      //       userId,
      //     },
      //   });

      //   return;
      // }
    } else {
      notification.error({
        message: "Login error",
        description: "Invalid email or password. Try again!",
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
      console.error("Login error:", error);
      message.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <Form form={form} onFinish={handleSubmit}>
        {/* <Form form={form}> */}
        {error && (
          <>
            <Alert message={error} type="error" showIcon />
            <br />
          </>
        )}
        <Form.Item

          style={{ marginBottom: '2rem' }}
          name="email"
          rules={[{ required: true, message: "Please input your Email" }]}
        // rules={[
        //   {
        //     required: true,
        //     pattern: /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/,
        //     message: "Please input valid Email!",
        //   },
        // ]}
        >
          <Input placeholder="   Email" size="large" className="form-input" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password
            placeholder="  Password"
            size="large" className="form-input"
            prefix={<LockOutlined />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <p style={{ width: '100%', textAlign: 'end' }}><Link style={{ fontSize: '16px' }} onClick={handleFogot} > Forgot password</Link></p>
        <Form.Item>

          <button
            type="primary"
            htmlType="submit"
            onLoad={isLoading}
            className="submit-btn"
          >
            Login
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
