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

export const textRecipe = defineRecipe({
  base: {
    fontFamily: "body",
    fontSize: "md",
    color: "neutral.100",
    lineHeight: "1.5",
  },
});

export const headingRecipe = defineRecipe({
  base: {
    fontFamily: "heading",
    fontWeight: "700",
  },
});

export const linkRecipe = defineRecipe({
  variants: {
    variant: {
      plain: {
        color: "neutral.100",
        fontWeight: "500",
        textDecoration: "none",
        _hover: {
          textDecoration: "none",
        },
        _active: {
          color: "green.300",
          textDecoration: "none",
        },
      },
    },
  },
  defaultVariants: {
    variant: "plain",
  },
});

export const inputRecipe = defineRecipe({
  variants: {
    variant: {
      solid: {
        minH: "48px",
        h: "48px",
        px: "4",
        borderRadius: "4px",
        bg: "neutral.100",
        border: "2px solid",
        borderColor: "purple.200",
        color: "neutral.800",
        fontSize: "md",
        fontWeight: "400",

        _placeholder: {
          color: "beige.300",
        },

        _focusVisible: {
          borderColor: "purple.300",
          boxShadow: `
            0 0 0 1px var(--chakra-colors-neutral-800),
            0 0 0 3px var(--chakra-colors-purple-300)
          `,
        },

        _invalid: {
          borderColor: "error.100",
        },

        _disabled: {
          opacity: 0.6,
          cursor: "not-allowed",
        },
      },
    },
  },

  defaultVariants: {
    variant: "solid",
  },
});
