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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const genders = [
    {
      icon: <IoFemaleSharp />,
      value: "woman",
      title: t("onboarding.gender.woman"),
    },
    {
      icon: <IoMaleSharp />,
      value: "man",
      title: t("onboarding.gender.man"),
    },
  ];

  return (
    <VStack align="stretch" gap={4}>
      <VStack w="full" align="start" gap={1}>
        <Heading size="lg">{t("onboarding.sub_heading.general")}</Heading>
        <Text>{t("onboarding.sub_content.general")}</Text>
      </VStack>

      <Field.Root>
        <FormLabel>
          {t("onboarding.labels.birth_date")}
          <InlineIcon name="calendar_today" color="yellow.100" />
        </FormLabel>
        <Input
          type="date"
          aria-required="true"
          placeholder={t("onboarding.labels.birth_date")}
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
          {t("onboarding.labels.gender")}
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
          {t("onboarding.labels.location")}
          <InlineIcon name="distance" color="green.200" />
        </FormLabel>
        <Input
          type="text"
          aria-required="true"
          placeholder={t("onboarding.labels.location")}
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </Field.Root>
    </VStack>
  );
};

export default BasicInfoStep;
