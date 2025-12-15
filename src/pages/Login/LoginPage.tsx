import { Box, VStack, Image, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { t } = useTranslation();

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
        {/* TODO: Add login text */}
        <Text fontSize="lg" textAlign="center">
          Placeholder text. Login text goes here.
        </Text>

        <Button
          colorScheme="teal"
          variant="outline"
          w="100%"
          onClick={() => console.log("add logic")}
        >
          {t("login")}
        </Button>

        <Link to={"/welcome"}>
          Not your preferred way to join? Go back to options.
        </Link>
      </VStack>
    </Box>
  );
};

export default LoginPage;
