import FormLabel from "@/components/atoms/FormLabel";
import InlineIcon from "@/components/atoms/InlineIcon";
import { VStack, Input, Field, Heading, Text } from "@chakra-ui/react";

type BasicInfoStepProps = {
  age: number | null;
  location: string;
  onAgeChange: (value: number | null) => void;
  onLocationChange: (value: string) => void;
};

const BasicInfoStep = ({
  age,
  location,
  onAgeChange,
  onLocationChange,
}: BasicInfoStepProps) => {
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
          <InlineIcon name="calendar_today" color="green.200" />
        </FormLabel>
        <Input
          type="number"
          aria-required="true"
          // TODO: Add translation
          placeholder="Age"
          value={age ?? ""}
          onChange={(e) =>
            onAgeChange(e.target.value ? Number(e.target.value) : null)
          }
        />
        {/* <Field.ErrorText></Field.ErrorText> */}
      </Field.Root>

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
        {/* <Field.ErrorText></Field.ErrorText> */}
      </Field.Root>
    </VStack>
  );
};

export default BasicInfoStep;
