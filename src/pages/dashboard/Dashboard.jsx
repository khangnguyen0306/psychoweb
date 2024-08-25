import { Badge, Button, Card, Col, Form, Input, Row, Select } from "antd";
import {
  useGetFlowersQuery,
  useAddFlowerMutation,
} from "../../services/flowerApi";
import FormItem from "antd/es/form/FormItem";
import Meta from "antd/es/card/Meta";
import "./Dashboard.scss"
import IMG from '../../assets/image/image-login.jpg';
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Slider from "../../components/Home/slider/Slider";
import OptometryServices from "../../components/Home/Workhours/OptometryServices ";

function Dashboard() {

  const { data, isLoading } = useGetFlowersQuery();
  const [mutate] = useAddFlowerMutation();
  console.log(data);
  const onChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = async (data) => {
    console.log("data: " + data);
    try {
      const newData = {
        ...data,
      };
      console.log(newData);
      await mutate(newData).unwrap();
    } catch (err) {
      console.log(err.message);
    }
  };
  if (isLoading) {
    return <div> flower is loading</div>;
  }
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
      </Row>



    </div>
  );
}

export default Dashboard;
