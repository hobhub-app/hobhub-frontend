import {
  Box,
  VStack,
  Button,
  Text,
  Collapsible,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type SortMode = "similar" | "nearest";
type PanelMode = "sort" | "filter";

type Props = {
  isOpen: boolean;
  mode: PanelMode;
  selectedGender: string | null;
  onSelectGender: (gender: string | null) => void;
  hobbyQuery: string;
  hobbies: { id: number; name: string }[];
  onHobbyQueryChange: (value: string) => void;
  onSelectHobby: (id: number) => void;
  onSelectSort: (mode: SortMode) => void;
  onClearFilters: () => void;
};

const SortFilterPanel = ({
  isOpen,
  mode,
  selectedGender,
  onSelectGender,
  onSelectSort,
  hobbyQuery,
  hobbies,
  onHobbyQueryChange,
  onSelectHobby,
  onClearFilters,
}: Props) => {
  const { t } = useTranslation();

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
                {t("browse.filter.heading.sort")}
              </Text>
              <SimpleGrid columns={2} gap={2}>
                <Button
                  variant="plain"
                  colorPalette="yellow"
                  onClick={() => onSelectSort("similar")}
                >
                  {t("browse.filter.similar")}
                </Button>

                <Button
                  variant="plain"
                  colorPalette="yellow"
                  onClick={() => onSelectSort("nearest")}
                >
                  {t("browse.filter.near")}
                </Button>
              </SimpleGrid>
            </VStack>
          )}

          {mode === "filter" && (
            <VStack align="stretch" gap={4}>
              <Text fontWeight="800" fontFamily="heading">
                {t("browse.filter.heading.filter")}
              </Text>

              <VStack align="stretch">
                <Text fontSize="sm" fontFamily="heading" fontWeight="600">
                  {t("browse.filter.gender")}
                </Text>
                <SimpleGrid columns={2} gap={2}>
                  <Button
                    variant="plain"
                    colorPalette="yellow"
                    onClick={() =>
                      onSelectGender(
                        selectedGender === "woman" ? null : "woman"
                      )
                    }
                  >
                    {t("browse.filter.woman")}
                  </Button>
                  <Button
                    variant="plain"
                    colorPalette="yellow"
                    onClick={() =>
                      onSelectGender(selectedGender === "man" ? null : "man")
                    }
                  >
                    {t("browse.filter.man")}
                  </Button>
                </SimpleGrid>
              </VStack>

              <VStack align="stretch">
                <Text fontSize="sm" fontFamily="heading" fontWeight="600">
                  {t("browse.filter.hobby")}
                </Text>

                <Input
                  placeholder={t("browse.filter.search")}
                  value={hobbyQuery}
                  onChange={(e) => onHobbyQueryChange(e.target.value)}
                />

                {hobbyQuery.length > 0 && (
                  <VStack align="stretch">
                    <SimpleGrid columns={2} gap={2}>
                      {hobbies.map((hobby) => (
                        <Button
                          key={hobby.id}
                          variant="plain"
                          onClick={() => onSelectHobby(hobby.id)}
                        >
                          {hobby.name}
                        </Button>
                      ))}
                    </SimpleGrid>
                  </VStack>
                )}
                <Button
                  variant="plain"
                  colorPalette="red"
                  onClick={onClearFilters}
                >
                  {t("browse.filter.clear")}
                </Button>
              </VStack>
            </VStack>
          )}
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default SortFilterPanel;
