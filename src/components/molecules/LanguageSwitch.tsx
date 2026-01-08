import { HStack, RadioCard } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { languages, type LanguageCode } from "@/constants/languages";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: LanguageCode) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <RadioCard.Root
      size="sm"
      value={i18n.language}
      onValueChange={(details) => changeLanguage(details.value as LanguageCode)}
    >
      <HStack gap={3}>
        {languages.map((lang) => (
          <RadioCard.Item
            key={lang.value}
            value={lang.value}
            cursor="pointer"
            _hover={{
              bgColor: "purple.300",
            }}
            _active={{
              bgColor: "purple.300",
            }}
            _checked={{
              bg: "purple.300",
              border: "solid transparent",
              color: "white",
            }}
            transition="background-color 0.2s ease"
            borderRadius="lg"
            border="solid 1px"
            borderColor="neutral.100"
          >
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemContent px={2}>
                <HStack gap={2}>
                  <RadioCard.ItemText
                    fontSize="sm"
                    fontWeight="600"
                    _groupChecked={{ color: "white" }}
                    color="neutral.100"
                  >
                    {lang.value}
                  </RadioCard.ItemText>
                </HStack>
              </RadioCard.ItemContent>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  );
};

export default LanguageSwitch;
