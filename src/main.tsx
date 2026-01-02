import "./config/i18n.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChakraProvider from "./components/ui/provider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.tsx";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "./graphql/client.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "material-symbols/outlined.css";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <ApolloProvider client={apolloClient}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </StrictMode>
);
