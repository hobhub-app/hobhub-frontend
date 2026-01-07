import PageSpinner from "@/components/atoms/PageSpinner";
import StatusAlert from "@/components/atoms/StatusAlert";
import HobbyTag from "@/components/molecules/HobbyTag";
import { SKILL_LEVELS } from "@/constants/skillLevels";
import { HOBBIES } from "@/graphql/queries/hobbies";
import type { HobbiesData } from "@/graphql/types/hobby";
import { useQuery } from "@apollo/client/react";
import {
  Input,
  Listbox,
  VStack,
  Text,
  Button,
  Dialog,
  HStack,
  Wrap,
  Heading,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiCloseLargeFill } from "react-icons/ri";

type SelectedHobby = {
  value: string;
  label: string;
  skillLevel: string;
};

type HobbiesStepProps = {
  selectedHobbies: SelectedHobby[];
  onChange: React.Dispatch<React.SetStateAction<SelectedHobby[]>>;
};

const HobbiesStep = ({ selectedHobbies, onChange }: HobbiesStepProps) => {
  const [pendingHobby, setPendingHobby] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");

  const selectedValues = new Set(selectedHobbies.map((h) => h.value));

  const { data: hobbyData, loading, error } = useQuery<HobbiesData>(HOBBIES);

  const hobbies = useMemo(() => {
    return createListCollection({
      items:
        hobbyData?.hobbies.map((hobby) => ({
          label: hobby.name,
          value: hobby.id.toString(),
        })) ?? [],
      itemToString: (item) => item.label,
    });
  }, [hobbyData]);

  const handleSelectionChange = (details: { value: string[] }) => {
    const value = details.value[0];
    if (!value) return;

    const hobby = hobbies.items.find((item) => item.value === value);
    if (!hobby) return;

    setPendingHobby({
      value: hobby.value,
      label: hobby.label,
    });
  };

  const handleRemoveHobby = (value: string) => {
    onChange((prev: SelectedHobby[]) =>
      prev.filter((hobby) => hobby.value !== value)
    );
  };

  if (loading) {
    return <PageSpinner />;
  }
  if (error) {
    return (
      <StatusAlert
        status="error"
        title="User not found"
        description="This profile could not be loaded."
      />
    );
  }

  return (
    <VStack align="stretch" gap={4}>
      {/* TODO: Add translation */}
      <Heading fontSize="lg">Select your hobbies</Heading>

      {/* Open dialog explicitly */}
      <Button
        variant="solid"
        colorPalette="green"
        onClick={() => setIsOpen(true)}
      >
        Add hobby <LuPlus />
      </Button>

      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e.open);
          if (!e.open) {
            setPendingHobby(null);
          }
        }}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="neutral.900">
            <HStack w="full" alignItems="center" justifyContent="space-between">
              <Dialog.Header flex="1">
                {/* TODO: Add translation */}
                <Dialog.Title fontSize="lg" fontWeight="800">
                  Select a hobby
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.CloseTrigger
                position="absolute"
                top={2}
                right={2}
                aria-label="Close dialog"
                color="neutral.100"
              >
                <RiCloseLargeFill />
              </Dialog.CloseTrigger>
            </HStack>

            <Dialog.Body>
              <VStack>
                <Listbox.Root
                  collection={hobbies}
                  color="purple.100"
                  onValueChange={handleSelectionChange}
                >
                  <Listbox.Input
                    as={Input}
                    placeholder="Search hobbies..."
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  <Listbox.Content
                    maxH="240px"
                    bg="neutral.900"
                    borderColor="purple.200"
                  >
                    {hobbies.items
                      .filter((item) => !selectedValues.has(item.value))
                      .filter((item) =>
                        item.label.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((item) => (
                        <Listbox.Item
                          key={item.value}
                          item={item}
                          role="group"
                          _hover={{
                            bg: "purple.100",
                            color: "purple.400",
                          }}
                          _selected={{ bg: "purple.300" }}
                        >
                          <Listbox.ItemText
                            color="neutral.100"
                            _groupHover={{ color: "purple.400" }}
                          >
                            {item.label}
                          </Listbox.ItemText>
                          <Listbox.ItemIndicator />
                        </Listbox.Item>
                      ))}
                  </Listbox.Content>
                </Listbox.Root>

                {pendingHobby && (
                  <VStack align="stretch" gap={2}>
                    <Text>
                      Skill level for <strong>{pendingHobby.label}</strong>
                    </Text>

                    <Wrap width="full">
                      {SKILL_LEVELS.map(({ level }) => (
                        <Button
                          key={level}
                          size="xs"
                          textStyle="xs"
                          variant="plain"
                          onClick={() => {
                            onChange((prev: SelectedHobby[]) => [
                              ...prev,
                              {
                                value: pendingHobby.value,
                                label: pendingHobby.label,
                                skillLevel: level,
                              },
                            ]);
                            setPendingHobby(null);
                            setIsOpen(false);
                          }}
                        >
                          {level}
                        </Button>
                      ))}
                    </Wrap>
                  </VStack>
                )}
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      {/* Added hobbies */}
      {selectedHobbies.length > 0 && (
        <VStack gap={1} align="start">
          <Text>Added hobbies</Text>
          <Wrap>
            {selectedHobbies.map((hobby) => (
              <HobbyTag
                key={hobby.value}
                name={hobby.label}
                skillLevel={hobby.skillLevel}
                showRemove
                onRemove={() => handleRemoveHobby(hobby.value)}
              />
            ))}
          </Wrap>
        </VStack>
      )}
    </VStack>
  );
};

export default HobbiesStep;
