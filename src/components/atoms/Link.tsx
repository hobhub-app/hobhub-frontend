import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import type { ComponentPropsWithoutRef } from "react";

type RouterLinkProps = ComponentPropsWithoutRef<typeof RouterLink>;

type Props = ChakraLinkProps & RouterLinkProps;

const Link = (props: Props) => {
  return <ChakraLink as={RouterLink} {...props} />;
};

export default Link;
