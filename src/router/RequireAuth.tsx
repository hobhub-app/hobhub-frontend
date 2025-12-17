import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? <Outlet /> : <Navigate to="/welcome" />;
};

export default RequireAuth;
