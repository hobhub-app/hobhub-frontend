import { Capacitor } from "@capacitor/core";
import { GOOGLE_SIGN_IN_MUTATION } from "@/graphql/mutations/auth";
import type { GoogleSignInResponse } from "@/graphql/types/auth";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  VStack,
  Image,
  Button as ChakraButton,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import hobhubLogo from "@/assets/images/hobhub-logo.svg";
import InlineIcon from "@/components/atoms/InlineIcon";
import StatusAlert from "@/components/atoms/StatusAlert";

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
      <VStack w="full" gap={16}>
        <Image
          src={hobhubLogo}
          alt="HobHub logo"
          boxSize="180px"
          objectFit="contain"
        />
        <Heading textAlign="center" size="xl" whiteSpace="pre-line">
          {t("welcome.headline.section_one")}
          <InlineIcon
            name="potted_plant"
            color="green.200"
            fontSize="2xl"
            pb={2}
          />
          {t("welcome.headline.section_two")}
          <InlineIcon
            name="wifi_tethering"
            color="yellow.100"
            fontSize="2xl"
            pb={1}
          />
          {t("welcome.headline.section_three")}
        </Heading>

        <VStack w="full" p={2} alignItems="stretch" gap={4}>
          <ChakraButton colorPalette="green" onClick={() => navigate("/login")}>
            {t("actions.login")}
          </ChakraButton>
          <ChakraButton
            colorPalette="purple"
            onClick={() => navigate("/register")}
          >
            {t("actions.register")}
          </ChakraButton>
          {!Capacitor.isNativePlatform() && (
            <Box
              display="flex"
              alignItems="stretch"
              justifyContent="stretch"
              height={14}
              mt={12}
            >
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const token = credentialResponse.credential;

                  if (token) {
                    const { data } = await googleSignIn({
                      variables: { token },
                    });

                    if (data && data.loginWithGoogle) {
                      localStorage.setItem("token", data.loginWithGoogle.token);
                      navigate("/");
                    }
                  }
                }}
                width="800"
                size="large"
                locale=""
                auto_select={true}
                onError={() => {
                  <StatusAlert
                    status={"info"}
                    title={t("alert.login_error")}
                  />;
                }}
              />
            </Box>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default WelcomePage;
