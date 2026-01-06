import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar/Navbar";
import { Box } from "@chakra-ui/react";
import NAVBAR_HEIGHT from "@/constants/layout";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";

const Layout = () => {
  const keyboardVisible = useKeyboardVisible();

  return (
    <>
      <Box as="header" />

      <Box
        as="main"
        pb={NAVBAR_HEIGHT}
        minH="100dvh"
        bgColor="neutral.800"
        pt={1}
        px={2}
      >
        <Outlet />
      </Box>

      {!keyboardVisible && <Navbar />}
    </>
  );
};

export default Layout;
