import Layout from "@/components/templates/Layout";
import HomePage from "@/pages/Home/HomePage";
import UserProfilePage from "@/pages/Home/UserProfilePage";
import LoginPage from "@/pages/Login/LoginPage";
import ChatPage from "@/pages/Messages/ChatPage";
import MessagesPage from "@/pages/Messages/MessagesPage";
import MyProfilePage from "@/pages/MyProfile/MyProfilePage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import SavedPage from "@/pages/Saved/SavedPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import WelcomePage from "@/pages/Start/WelcomePage";
import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import RequireProfile from "./RequireProfile";

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/my-profile",
            element: <MyProfilePage />,
          },
          {
            element: <RequireProfile />,
            children: [
              {
                path: "/",
                element: <HomePage />,
              },
              {
                path: "/profile/:userId",
                element: <UserProfilePage />,
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
        ],
      },
    ],
  },
]);

export default router;
