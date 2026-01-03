import { Spinner, VStack } from "@chakra-ui/react";

const PageSpinner = () => {
  return (
    <VStack w="full" minH="60vh" justify="center" pt="12">
      <Spinner size="lg" color="purple.200" borderWidth="3px" />
    </VStack>
  );
};

export default PageSpinner;
