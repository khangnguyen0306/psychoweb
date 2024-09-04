import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import CustomHeader from "../components/Header/CustomHeader";
import CustomFooter from "../components/Footer/CustomFooter";

const { Header, Sider, Content } = Layout;

const MainLayout = ({ showFooter = true }) => {
  const {
    token: { colorBgContainer, borderRadiusLG, ...other },
  } = theme.useToken();
  return (
    <Layout id="layout-body" style={{ backgroundColor: '#ffffff' }}>
      <CustomHeader />
      <Content
        style={{
          display: "flex",
          minHeight: 500,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
      {showFooter && <CustomFooter />}
    </Layout>
  );
};

export default MainLayout;