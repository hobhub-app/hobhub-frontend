import { GOOGLE_SIGN_IN_MUTATION } from "@/graphql/mutations/auth";
import type { GoogleSignInResponse } from "@/graphql/types/auth";
import { useMutation } from "@apollo/client/react";
import { Box, VStack, Image, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

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
          src="src/assets/images/hubhob-logo.svg"
          alt="HobHub logo"
          boxSize="115px"
          objectFit="contain"
        />
        {/* TODO: Add correct intro text */}
        <Text fontSize="lg" textAlign="center">
          Placeholder text. Welcome text goes here.
        </Text>

        <VStack w="100%">
          <Button
            colorScheme="blue"
            w="100%"
            onClick={() => navigate("/login")}
          >
            {t("login")}
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            w="100%"
            onClick={() => navigate("/register")}
          >
            {t("register")}
          </Button>
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
          <Button colorScheme="teal" variant="outline" w="100%">
            {t("facebook_sign_in")}
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default WelcomePage;
