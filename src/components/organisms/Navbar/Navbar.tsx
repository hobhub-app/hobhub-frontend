import NavItem from "@/components/molecules/NavItem/NavItem";
import { Box, HStack, For } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  RiHome2Fill,
  RiHome2Line,
  RiMessage3Fill,
  RiMessage3Line,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";

const Navbar = () => {
  const { t } = useTranslation();

  const navigationData = [
    {
      label: t("navigation.home"),
      path: "/",
      icon: RiHome2Line,
      activeIcon: RiHome2Fill,
    },
    {
      label: t("navigation.messages"),
      path: "/messages",
      icon: RiMessage3Line,
      activeIcon: RiMessage3Fill,
    },
    {
      label: t("navigation.profile"),
      path: "/my-profile",
      icon: RiUser3Line,
      activeIcon: RiUser3Fill,
    },
  ];
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="purple.300"
      borderTop="8px solid"
      borderColor="neutral.800"
      px={4}
      py={2}
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
