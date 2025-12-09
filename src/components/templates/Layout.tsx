import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar/Navbar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <>
      <Box as="main">
        <Outlet />
      </Box>
      <Navbar />
    </>
  );
};

export default Layout;
