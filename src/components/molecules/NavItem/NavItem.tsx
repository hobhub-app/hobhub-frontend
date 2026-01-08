import { Icon, VStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import type { NavItemProps } from "./types";

const NavItem = ({ href, icon, activeIcon, children }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  const IconComponent = isActive ? activeIcon : icon;

  return (
    <ChakraLink asChild>
      <Link
        to={href}
        aria-current={isActive ? "page" : undefined}
        style={{ textDecoration: "none" }}
      >
        <VStack
          cursor="pointer"
          _hover={{ color: "purle.200" }}
          _currentPage={{ color: "purple.200" }}
          transition="color 0.2s"
          minW="60px"
        >
          <Icon as={IconComponent} boxSize={6} />
          <Text fontSize="xs" _currentPage={{ fontWeight: "semibold" }}>
            {children}
          </Text>
        </VStack>
      </Link>
    </ChakraLink>
  );
};

export default NavItem;
