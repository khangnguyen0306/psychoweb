import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";
import AdminGuard from "./AdminGuard";
import ManagerGuard from "./ManagerGuard";
import MaintenancePage from "../components/MaintenancePage";

const Login = Loadable({ loader: () => import("../pages/login/Login") });
const Register = Loadable({ loader: () => import("../pages/register/Register") });
const DoctorPage = Loadable({ loader: () => import("../pages/doctor/DoctorPage") });
const DoctorDetailPage = Loadable({ loader: () => import("../pages/doctor/DoctorDetail") });
const BookingPage = Loadable({ loader: () => import("../pages/doctor/bookingPage") });
const Profile = Loadable({
  loader: () => import("../pages/profile/profile"),
});
// const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Home = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
const Admin = Loadable({
  loader: () => import("../pages/admin/Admin"),
});
const AdminUser = Loadable({
  loader: () => import("../pages/admin/AdminUser"),
});
const PaymentConfirmation = Loadable({
  loader: () => import("../components/PaymentConfirmation"),
});
const About = Loadable({
  loader: () => import("../pages/About/About"),
});
// const ManageProducts = Loadable({
//   loader: () => import("../pages/manage/ManageProducts"),
// });

export const router = createBrowserRouter([
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/payment-confirmation",
    element: PaymentConfirmation,
  },
  {
    path: "/register",
    element: Register,
  },
  {
    path: "/about",
    element: About,
  },
  {
    path: "/doctor",
    element: DoctorPage,
  },
  {
    path: "/doctor/:dtId",
    element: DoctorDetailPage,
  },
  {
    path: "admin",
    element: <AuthGuard />,
    children: [
      {
        index: false,
        element: <AdminGuard />,
        children: [
          {
            index: true,
            element: Admin,
          },
          {
            path: "users",
            element: AdminUser,
            
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout showFooter={false} />,
    children: [
      {
        index: true,
        element: Home,
      },
      {
        path: "/",
        element: <AuthGuard />,
        children: [
          {
            index: true,
            element: Home,
          },
          {
            path: "profile",
            element: Profile,
          },
          {
            path: "/booking",
            element: BookingPage,
          },
        ],
      },
     
      {
        path: "manage-products",
        element: <AuthGuard />,
        children: [
          {
            index: false,
            element: <ManagerGuard />,
            children: [
              {
                index: true,
                element: Admin,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <MaintenancePage/>,
  },
]);
