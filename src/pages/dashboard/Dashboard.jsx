import { Badge, Button, Card, Col, Form, Input, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import Meta from "antd/es/card/Meta";
import "./Dashboard.scss"
import IMG from '../../assets/image/image-login.jpg';
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Slider from "../../components/Home/slider/Slider";
import OptometryServices from "../../components/Home/Workhours/OptometryServices ";
import DoctorList from "../../components/Home/listDoctor/DoctorList";
import Patient from "../../components/Home/Patient/patient";
import Services from "../../components/Home/services/service";
import CustomFooter from "../../components/Footer/CustomFooter";

function Dashboard() {

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",

      }}
    >
      <Row style={{ marginTop: '100px' }}>
        <Slider />
        <OptometryServices />
        <DoctorList/>
        <Services/>
        <Patient/>
      </Row>
      <CustomFooter/>
    </div>
  );
}

export default Dashboard;
