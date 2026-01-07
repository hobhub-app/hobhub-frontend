import FormLabel from "@/components/atoms/FormLabel";
import InlineIcon from "@/components/atoms/InlineIcon";
import {
  VStack,
  Input,
  Field,
  Heading,
  Text,
  HStack,
  Icon,
  RadioCard,
} from "@chakra-ui/react";
import { IoMaleSharp, IoFemaleSharp } from "react-icons/io5";

type BasicInfoStepProps = {
  dateOfBirth: Date | null;
  gender?: string;
  location: string;
  onDateOfBirthChange: (value: Date | null) => void;
  onGenderChange: (value: string) => void;
  onLocationChange: (value: string) => void;
};

const BasicInfoStep = ({
  dateOfBirth,
  gender,
  location,
  onDateOfBirthChange,
  onGenderChange,
  onLocationChange,
}: BasicInfoStepProps) => {
  const genders = [
    {
      icon: <IoFemaleSharp />,
      value: "woman",
      title: "Woman",
    },
    {
      icon: <IoMaleSharp />,
      value: "man",
      title: "Man",
    },
  ];

  return (
    <VStack align="stretch" gap={4}>
      <VStack w="full" align="start" gap={1}>
        <Heading size="lg">
          {/* TODO: Add translation */}
          Basic information
        </Heading>
        <Text>
          {/* TODO: Add translation */}
          We need this to help others find you.
        </Text>
      </VStack>

      <Field.Root>
        <FormLabel>
          {/* TODO: Add translation */}
          Date of birth
          <InlineIcon name="calendar_today" color="yellow.100" />
        </FormLabel>
        <Input
          type="date"
          aria-required="true"
          // TODO: Add translation
          placeholder="Date of birth"
          value={dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : ""}
          onChange={(e) =>
            onDateOfBirthChange(
              e.target.value ? new Date(e.target.value) : null
            )
          }
        />
      </Field.Root>

      <RadioCard.Root
        value={gender ?? ""}
        onValueChange={(details) => {
          if (details.value) {
            onGenderChange(details.value);
          }
        }}
      >
        <RadioCard.Label textStyle="md" fontFamily="heading" fontWeight="600">
          Select Gender
        </RadioCard.Label>
        <HStack align="stretch">
          {genders.map((item) => (
            <RadioCard.Item key={item.value} value={item.value}>
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemContent>
                  <HStack>
                    <Icon size="md" color="purple.200">
                      {item.icon}
                    </Icon>
                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                  </HStack>
                </RadioCard.ItemContent>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </HStack>
      </RadioCard.Root>

      <Field.Root>
        <FormLabel>
          {/* TODO: Add translation */}
          Location
          <InlineIcon name="distance" color="green.200" />
        </FormLabel>
        <Input
          type="text"
          aria-required="true"
          // TODO: Add translation
          placeholder="Location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </Field.Root>
    </VStack>
  );
};

export default BasicInfoStep;
