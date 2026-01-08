import { getSkillLevelColor } from "@/utils/getSkillLevelColor";
import { Tag, Circle, type TagRootProps } from "@chakra-ui/react";

type HobbyTagProps = {
  name: string;
  skillLevel?: string;
  showRemove?: boolean;
  onRemove?: () => void;
} & TagRootProps;

const HobbyTag = ({
  name,
  skillLevel,
  showRemove = false,
  onRemove,
  ...tagProps
}: HobbyTagProps) => {
  const skillColor = getSkillLevelColor(skillLevel);

  return (
    <Tag.Root colorPalette="purple" size="xl" variant="subtle" {...tagProps}>
      {skillColor && (
        <Tag.StartElement display="flex" alignItems="center">
          <Circle
            bg={skillColor}
            size={2.5}
            outline="1px solid"
            outlineColor="neutral.900"
          />
        </Tag.StartElement>
      )}
      <Tag.Label
        color="purple.400"
        fontFamily="heading"
        fontWeight="800"
        fontSize="xs"
      >
        {name}
      </Tag.Label>
      {showRemove && (
        <Tag.EndElement color="purple.400">
          <Tag.CloseTrigger onClick={onRemove} />
        </Tag.EndElement>
      )}
    </Tag.Root>
  );
};

export default HobbyTag;
