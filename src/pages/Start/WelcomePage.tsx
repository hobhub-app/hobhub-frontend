import { GOOGLE_SIGN_IN_MUTATION } from "@/graphql/mutations/auth";
import type { GoogleSignInResponse } from "@/graphql/types/auth";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  VStack,
  Image,
  // Text,
  Button as ChakraButton,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import hobhubLogo from "@/assets/images/hobhub-logo.svg";

const WelcomePage = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const [googleSignIn] = useMutation<GoogleSignInResponse>(
    GOOGLE_SIGN_IN_MUTATION
  );

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack w="100%" maxW="sm" mx="auto" mt={12}>
        <Image
          src={hobhubLogo}
          alt="HobHub logo"
          boxSize="180px"
          objectFit="contain"
        />
        {/* TODO: Add correct intro text */}
        <Heading textAlign="center" size="2xl">
          The place to connect with new people to perform your hobbies with.
        </Heading>

        <VStack w="100%">
          <ChakraButton colorPalette="green" onClick={() => navigate("/login")}>
            {t("login")}
          </ChakraButton>
          <ChakraButton
            colorPalette="purple"
            onClick={() => navigate("/register")}
          >
            {t("register")}
          </ChakraButton>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const token = credentialResponse.credential;

              if (token) {
                const { data } = await googleSignIn({ variables: { token } });

                if (data && data.loginWithGoogle) {
                  localStorage.setItem("token", data.loginWithGoogle.token);
                  navigate("/");
                }
              }
            }}
            width="800"
            size="medium"
            locale=""
            auto_select={true}
            onError={() => console.log("login failed")}
          />
          <ChakraButton>{t("facebook_sign_in")}</ChakraButton>
        </VStack>
      </VStack>
    </Box>
  );
};

export default WelcomePage;
