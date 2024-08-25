
import { Outlet } from "react-router-dom";
import {
  Layout,
  theme,
} from "antd";
import CustomHeader from "../components/Header/CustomHeader";
import CustomFooter from "../components/Footer/CustomFooter";


const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, ...other },
  } = theme.useToken();
  return (
    <Layout
      id="layout-body"
      style={{backgroundColor:'#ffffff'}}
    >
      <CustomHeader />
      <Content
        style={{
          display: "flex",
          // padding: 50,
          minHeight: 500,
          // background: other.colorBorderSecondary,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
      <CustomFooter />
    </Layout>

  );
};

export default MainLayout;
