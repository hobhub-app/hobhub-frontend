import { Outlet, useMatch } from "react-router-dom";
import Navbar from "../organisms/Navbar/Navbar";
import { Box } from "@chakra-ui/react";
import { NAVBAR_HEIGHT } from "@/constants/layout";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";

const Layout = () => {
  const keyboardVisible = useKeyboardVisible();
  const isUserProfilePage = useMatch("/profile/:userId");
  const isChatPage = useMatch("/messages/:chatId");
  const isOnboardingPage = useMatch("/onboarding");

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
        animation="fadeIn 0.3s ease"
      >
        <Outlet />
      </Box>
      {!isUserProfilePage &&
        !isChatPage &&
        !isOnboardingPage &&
        !keyboardVisible && <Navbar />}
    </>
  );
};

export default Layout;
