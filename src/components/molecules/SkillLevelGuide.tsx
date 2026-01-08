import { SKILL_LEVELS } from "@/constants/skillLevels";
import { HStack, Circle, Text, Accordion } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SkillLevelGuide = () => {
  const { t } = useTranslation();

  return (
    <Accordion.Root collapsible variant="plain">
      <Accordion.Item value="Test">
        <Accordion.ItemTrigger px={0}>
          <Text textStyle="sm" fontWeight="400" color="beige.50">
            {t("onboarding.skill_guide.title")}
          </Text>
          <Accordion.ItemIndicator color="purple.200" />
        </Accordion.ItemTrigger>

        <Accordion.ItemContent>
          <Accordion.ItemBody px={0} pt={2}>
            <HStack gap={6} flexWrap="wrap">
              {SKILL_LEVELS.map(({ level, color }) => (
                <HStack key={level} gap={1}>
                  <Circle
                    bg={color}
                    size={2.5}
                    outline="1px solid"
                    outlineColor="neutral.900"
                  />
                  <Text fontSize="xs" color="neutral.100">
                    {t(`constants.skill_levels.labels.${level}`)}
                  </Text>
                </HStack>
              ))}
            </HStack>
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default SkillLevelGuide;
