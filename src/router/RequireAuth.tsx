import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  //Placeholder logic
  const isLoggedIn = false; // TODO: replace with real logic
  return isLoggedIn ? <Outlet /> : <Navigate to="/welcome" />;
};

export default RequireAuth;
