import { chakra } from "@chakra-ui/react";

type InlineIconProps = {
  name: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
};

const InlineIcon = ({
  name,
  color = "currentColor",
  fontSize = "1.125rem",
  fontWeight = "400",
}: InlineIconProps) => (
  <chakra.span
    className="material-symbols-outlined"
    aria-hidden
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
    verticalAlign="middle"
  >
    {name}
  </chakra.span>
);

export default InlineIcon;
