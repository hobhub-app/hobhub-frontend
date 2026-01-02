import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import colors from "./colors";
import fonts from "./fonts";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts,
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
