import { Button, Col, Divider, Form, Image, Input, Layout, Row, Space } from "antd";
import "./../../components/login/Login.scss";

import { useSelector } from "react-redux";
// import { selectCurrenToken } from "../../slices/auth.slice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import imager from '../../assets/image/image-login.jpg';
import { selectCurrentToken } from "../../slices/auth.slice.js";
import LoginForm from "../../components/login/FormLogin.jsx";
function Login() {
  // const token = useSelector(selectCurrentToken);
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

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
              <Space>
                <Row>
                  <Col style={{ padding: ' 6rem 14rem' }}>
                    <h1 className="title-login">
                      Sign in
                    </h1>
                    <div className="form-login">
                      <LoginForm />
                      <Divider plain style={{ padding: '15px' }}><span>Or</span></Divider>

                      <div style={{ textAlign: 'center' }}>
                        <p>You don't have an account? <Link style={{ fontSize: '16px', padding: '10px' }} to={"/register"} > Sign up</Link> </p>
                      </div>
                    </div>

                  </Col>
                  <Col className="image-login">
                    <Image preview={false} src={imager} style={{ height: '100vh' }} />
                  </Col>
                </Row>
              </Space>
            </div>
          </Layout>
        </>
      )}
    </>
  );
}

export default Login;