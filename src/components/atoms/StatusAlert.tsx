import { Alert, HStack, VStack } from "@chakra-ui/react";

type StatusAlertProps = {
  status: "info" | "error" | "success";
  title: string;
  description?: string;
  colorPalette?: string;
};

const StatusAlert = ({
  status,
  title,
  description,
  colorPalette,
}: StatusAlertProps) => {
  return (
    <Alert.Root status={status} variant="subtle" colorPalette={colorPalette}>
      <VStack flex="1" alignItems="start">
        <HStack>
          <Alert.Indicator color={`${colorPalette}.400`} />
          <Alert.Title color={`${colorPalette}.400`}>{title}</Alert.Title>
        </HStack>
        {description && (
          <Alert.Description color={`${colorPalette}.400`}>
            {description}
          </Alert.Description>
        )}
      </VStack>
    </Alert.Root>
  );
};

export default StatusAlert;
