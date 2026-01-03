import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar/Navbar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  const NAVBAR_HEIGHT = "80px";

  return (
    <Box>
      <Box as="main" pb={NAVBAR_HEIGHT} minH="100vh" bgColor="neutral.800">
        <Outlet />
      </Box>
      <Navbar />
    </Box>
  );
};

export default Layout;
