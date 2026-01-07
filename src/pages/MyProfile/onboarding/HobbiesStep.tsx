import HobbyTag from "@/components/molecules/HobbyTag";
import {
  Box,
  Input,
  Listbox,
  useFilter,
  useListCollection,
  VStack,
  Text,
  Button,
  Dialog,
  HStack,
  Wrap,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuAtom, LuPlus } from "react-icons/lu";
import { RiCloseLargeFill } from "react-icons/ri";

type SelectedHobby = {
  value: string;
  label: string;
  skillLevel: string;
};

type ListboxValueChangeDetails = {
  value: string[];
};

type HobbiesStepProps = {
  selectedHobbies: SelectedHobby[];
  onChange: React.Dispatch<React.SetStateAction<SelectedHobby[]>>;
};

const HobbiesStep = ({ selectedHobbies, onChange }: HobbiesStepProps) => {
  const { contains } = useFilter({ sensitivity: "base" });

  //   const [selectedHobbies, setSelectedHobbies] = useState<SelectedHobby[]>([]);
  const [pendingHobby, setPendingHobby] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedValues = new Set(selectedHobbies.map((hobby) => hobby.value));

  const { collection, filter } = useListCollection({
    // TODO: Replace with actual hobby data from API/backend
    initialItems: [
      { label: "React.js", value: "react", icon: <LuAtom size={16} /> },
      { label: "Vue.js", value: "vue", icon: <LuAtom size={16} /> },
      { label: "Angular", value: "angular", icon: <LuAtom size={16} /> },
      { label: "Svelte", value: "svelte", icon: <LuAtom size={16} /> },
      { label: "Next.js", value: "nextjs", icon: <LuAtom size={16} /> },
    ],
    filter: contains,
  });

  const handleSelectionChange = (details: ListboxValueChangeDetails) => {
    const selectedValue = details.value[0];
    const hobby = collection.items.find((item) => item.value === selectedValue);

    if (hobby) {
      setPendingHobby({
        value: hobby.value,
        label: hobby.label,
      });
    }
  };

  const handleRemoveHobby = (value: string) => {
    onChange((prev: SelectedHobby[]) =>
      prev.filter((hobby) => hobby.value !== value)
    );
  };

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
                  collection={collection}
                  color="purple.100"
                  onValueChange={handleSelectionChange}
                >
                  <Listbox.Input
                    as={Input}
                    placeholder="Search hobbies..."
                    onChange={(e) => filter(e.target.value)}
                  />

                  <Listbox.Content
                    maxH="240px"
                    bg="neutral.900"
                    borderColor="purple.200"
                  >
                    {collection.items
                      .filter((item) => !selectedValues.has(item.value))
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
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={3}
                            color="yellow.100"
                            flexShrink="0"
                          >
                            {item.icon}
                            <Listbox.ItemText
                              color="neutral.100"
                              _groupHover={{ color: "purple.400" }}
                            >
                              {item.label}
                            </Listbox.ItemText>
                          </Box>
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
                      {["beginner", "intermediate", "advanced", "expert"].map(
                        (level) => (
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
                        )
                      )}
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
