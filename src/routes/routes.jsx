import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../layout/MainLayout";
import AuthGuard from "./AuthGuard";
import AdminGuard from "./AdminGuard";
import ManagerGuard from "./ManagerGuard";


const Login = Loadable({ loader: () => import("../pages/login/Login") });
const Register = Loadable({ loader: () => import("../pages/register/Register") });
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Dashboard = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
const Admin = Loadable({
  loader: () => import("../pages/admin/Admin"),
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
    path: "/register",
    element: Register,
  },
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true, 
        element: Dashboard,
      },
      {
        path: "home",
        element: <AuthGuard />, 
        children: [
          {
            index: true,
            element: Home,
          },
        ],
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
            ],
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
    element: <div>ERROR</div>,
  },
]);
