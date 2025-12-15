import { Box, VStack, Image, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

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
          <Button colorScheme="blue" w="100%">
            {t("google_sign_in")}
          </Button>
          <Button colorScheme="teal" variant="outline" w="100%">
            {t("facebook_sign_in")}
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default WelcomePage;
