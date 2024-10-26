import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../slices/auth.slice";
import { message } from "antd";

const AuthGuard = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    message.destroy();
    message.warning("Bạn cần đăng nhập trước khi đặt lịch !")
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
