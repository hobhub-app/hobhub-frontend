import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./fonts";
import { buttonRecipe } from "./recipes";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts,
    },
    recipes: { button: buttonRecipe },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
