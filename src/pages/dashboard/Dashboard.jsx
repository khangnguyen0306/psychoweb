import { Badge, Button, Card, Col, Form, Input, Row, Select } from "antd";
import "./Dashboard.scss"
import Slider from "../../components/Home/slider/Slider";
import OptometryServices from "../../components/Home/Workhours/OptometryServices ";
import DoctorList from "../../components/Home/listDoctor/DoctorList";
import Patient from "../../components/Home/Patient/patient";
import Services from "../../components/Home/services/service";
import CustomFooter from "../../components/Footer/CustomFooter";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../slices/auth.slice";
import DashboardForDoctor from "./DashboardForDoctor";

function Dashboard() {

  const user = useSelector(selectCurrentUser)

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",

      }}
    >
      <Row style={{ marginTop: '100px' }}>
        {user?.role == "PSYCHIATRIST" ? (
          <DashboardForDoctor />
        ) : (
          <>
            <Slider />
            <OptometryServices />
            <DoctorList />
            <Services />
            <Patient />
          </>
        )}
      </Row>
      <CustomFooter />
    </div>
  );
}

export default Dashboard;
