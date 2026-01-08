import { chakra } from "@chakra-ui/react";

type InlineIconProps = {
  name: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
} & React.ComponentProps<typeof chakra.span>;

const InlineIcon = ({
  name,
  color = "currentColor",
  fontSize = "1.125rem",
  fontWeight = "400",
  ...rest
}: InlineIconProps) => (
  <chakra.span
    className="material-symbols-outlined"
    aria-hidden
    color={color}
    fontSize={fontSize}
    fontWeight={fontWeight}
    verticalAlign="middle"
    {...rest}
  >
    {name}
  </chakra.span>
);

export default InlineIcon;
