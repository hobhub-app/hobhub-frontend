import {
  Box,
  VStack,
  Button,
  Text,
  Collapsible,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

type SortMode = "similar" | "nearest";
type PanelMode = "sort" | "filter";

type Props = {
  isOpen: boolean;
  mode: PanelMode;
  onSelectSort: (mode: SortMode) => void;
};

const SortFilterPanel = ({ isOpen, mode, onSelectSort }: Props) => {
  const [hobbyQuery, setHobbyQuery] = useState("");

  return (
    <Collapsible.Root open={isOpen} width="full">
      <Collapsible.Content>
        <Box
          mt={2}
          p={4}
          borderRadius="md"
          bg="neutral.900"
          color="neutral.100"
        >
          {mode === "sort" && (
            <VStack align="stretch" gap={3}>
              <Text fontWeight="800" fontFamily="heading">
                {/* Todo: Add translation */}
                Sort users on
              </Text>
              <SimpleGrid columns={2} gap={2}>
                <Button
                  variant="plain"
                  colorPalette="yellow"
                  onClick={() => onSelectSort("similar")}
                >
                  {/* Todo: Add translation */}
                  Most similar
                </Button>

                <Button
                  variant="plain"
                  colorPalette="yellow"
                  onClick={() => onSelectSort("nearest")}
                >
                  {/* Todo: Add translation */}
                  Nearest
                </Button>
              </SimpleGrid>
            </VStack>
          )}

          {mode === "filter" && (
            <VStack align="stretch" gap={4}>
              <Text fontWeight="800" fontFamily="heading">
                {/* Todo: Add translation */}
                Filter users on
              </Text>

              <VStack align="stretch">
                <Text fontSize="sm" opacity={0.8}>
                  Gender
                </Text>
                <SimpleGrid columns={2} gap={2}>
                  <Button variant="plain" colorPalette="yellow">
                    {/* Todo: Add translation */}
                    Women
                  </Button>
                  <Button variant="plain" colorPalette="yellow">
                    {/* Todo: Add translation */}
                    Men
                  </Button>
                </SimpleGrid>
              </VStack>

              <VStack align="stretch">
                <Text fontSize="sm" opacity={0.8}>
                  {/* Todo: Add translation */}
                  Hobby
                </Text>

                <Input
                  placeholder="Search hobby"
                  value={hobbyQuery}
                  onChange={(e) => setHobbyQuery(e.target.value)}
                  disabled
                />

                {/* TODO: Add hobby filtering */}
              </VStack>
            </VStack>
          )}
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default SortFilterPanel;
