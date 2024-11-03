import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../slices/auth.slice";

const AdminGuard = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  // Check if the user role is "ADMIN"
  if (!user || user.role !== "ADMIN") {
    // Redirect to /404 if the user does not have admin rights
    return <Navigate to="/404" replace state={{ from: location }} />;
  }

  // If the user is an admin, render the child routes inside <Outlet />
  return <Outlet />;
};

export default AdminGuard;
