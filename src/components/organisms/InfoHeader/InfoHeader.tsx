import { INFO_HEADER_HEIGHT } from "@/constants/layout";
import { Box, HStack } from "@chakra-ui/react";

type InfoHeaderProps = {
  left?: React.ReactNode; // back button
  title: React.ReactNode; // text OR custom JSX
  right?: React.ReactNode; // save icon, settings, etc
};

const InfoHeader = ({ left, title, right }: InfoHeaderProps) => {
  return (
    <HStack
      position="fixed"
      top={0}
      left={0}
      right={0}
      h={INFO_HEADER_HEIGHT}
      borderBottom="2px solid"
      bg="neutral.800"
      borderBottomColor="neutral.100"
      justifyContent="space-between"
      alignItems="center"
      zIndex={1100}
    >
      {left && (
        <Box display="flex" w="40px" p={1}>
          {left}
        </Box>
      )}
      <Box flex="1" textAlign={left ? "center" : "left"} pl={!left ? 4 : 0}>
        {title}
      </Box>
      <Box w="40px" display="flex" justifyContent="flex-end">
        {right}
      </Box>
    </HStack>
  );
};

export default InfoHeader;
