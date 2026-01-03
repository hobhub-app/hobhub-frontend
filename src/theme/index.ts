import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./fonts";
import {
  buttonRecipe,
  headingRecipe,
  inputRecipe,
  linkRecipe,
  textRecipe,
} from "./recipes";

const config = defineConfig({
  globalCss: {
    "html, body, #root": {
      bg: "neutral.800",
      minH: "100%",
      fontSize: "md",
      fontWeight: "400",
      fontFamily: "body",
      color: "neutral.100",
      lineHeight: "1.5",
    },
  },
  theme: {
    tokens: {
      colors,
      fonts,
      //   fontSizes,
    },
    textStyles: {
      caption: {
        fontSize: "sm",
      },
      label: {
        fontFamily: "heading",
        fontSize: "xl",
      },
    },

    recipes: {
      button: buttonRecipe,
      text: textRecipe,
      heading: headingRecipe,
      link: linkRecipe,
      input: inputRecipe,
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
