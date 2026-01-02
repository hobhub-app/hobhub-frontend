import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    bg: "purple.300",
    color: "neutral.100",
    colorPalette: "purple",
  },
  variants: {
    variant: {
      solid: {
        w: "full",
        minH: "48px",
        borderRadius: "4px",
        px: "6",
        border: "transparent",
        bg: "colorPalette.300",
        color: "neutral.100",
        fontFamily: "heading",
        fontSize: "lg",
        fontWeight: "800",
        transition:
          "background-color 120ms ease-out, color 120ms ease-out, border-color 120ms ease-out, transform 120ms ease-out",
        _hover: {
          bg: "neutral.100",
          color: "colorPalette.300",
          border: "solid 2px",
          borderColor: "colorPalette.300",
        },
        _active: {
          bg: "neutral.100",
          color: "colorPalette.300",
          border: "2px solid",
          borderColor: "colorPalette.300",
        },
        _disabled: {
          opacity: "0.5",
        },
      },
    },
  },
});
