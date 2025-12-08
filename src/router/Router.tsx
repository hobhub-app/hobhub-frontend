import Layout from "@/components/templates/Layout";
import BrowsePage from "@/pages/Browse/BrowsePage";
import UserProfilePage from "@/pages/Browse/UserProfilePage";
import LoginPage from "@/pages/Login/LoginPage";
import ChatPage from "@/pages/Messages/ChatPage";
import MessagesPage from "@/pages/Messages/MessagesPage";
import MyProfilePage from "@/pages/MyProfile/MyProfilePage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import SavedPage from "@/pages/Saved/SavedPage";
import SignUpPage from "@/pages/SignUp/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <BrowsePage />,
      },
      {
        path: "/profile/:userId",
        element: <UserProfilePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/my-profile",
        element: <MyProfilePage />,
      },
      {
        path: "/saved",
        element: <SavedPage />,
      },
      {
        path: "/messages",
        element: <MessagesPage />,
      },
      {
        path: "/messages/:chatId",
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
