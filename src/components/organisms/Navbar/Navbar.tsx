import NavItem from "@/components/molecules/NavItem";
import { Box, HStack, For } from "@chakra-ui/react";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiHome2Fill,
  RiHome2Line,
  RiMessage3Fill,
  RiMessage3Line,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";

const navigationData = [
  {
    label: "Home",
    path: "/",
    icon: RiHome2Line,
    activeIcon: RiHome2Fill,
  },
  {
    label: "Messages",
    path: "/messages",
    icon: RiMessage3Line,
    activeIcon: RiMessage3Fill,
  },
  {
    label: "Saved",
    path: "/saved",
    icon: RiBookmarkLine,
    activeIcon: RiBookmarkFill,
  },
  {
    label: "Profile",
    path: "/my-profile",
    icon: RiUser3Line,
    activeIcon: RiUser3Fill,
  },
];

const Navbar = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      px={4}
      py={2}
      zIndex={1000}
      _dark={{
        bg: "gray.800",
        borderColor: "gray.600",
      }}
    >
      <HStack justify="space-around">
        <For each={navigationData}>
          {(item) => (
            <NavItem
              key={item.path}
              href={item.path}
              icon={item.icon}
              activeIcon={item.activeIcon}
            >
              {item.label}
            </NavItem>
          )}
        </For>
      </HStack>
    </Box>
  );
};

export default Navbar;
