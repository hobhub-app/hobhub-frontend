import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <VStack gap={6} maxW="md" mx="auto" px={4}>
        <Heading size="4xl" color="neutral.600">
          404
        </Heading>

        <VStack gap={3}>
          <Heading size="lg">{t("not_found.heading")}</Heading>
          <Text color="neutral.500" fontSize="lg">
            {t("not_found.description")}
          </Text>
        </VStack>

        <Button colorPalette="purple" size="lg" onClick={() => navigate("/")}>
          {t("not_found.go_home")}
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
