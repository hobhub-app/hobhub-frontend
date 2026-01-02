import { chakra } from "@chakra-ui/react";

type InlineIconProps = {
  name: string;
  color?: string;
  fontSize?: string;
};

const InlineIcon = ({
  name,
  color = "currentColor",
  fontSize = "1.125rem",
}: InlineIconProps) => (
  <chakra.span
    className="material-symbols-outlined"
    aria-hidden
    color={color}
    fontSize={fontSize}
    fontWeight="600"
    verticalAlign="middle"
  >
    {name}
  </chakra.span>
);

export default InlineIcon;
