import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sarahosterhed.hobhub",
  appName: "hobhub",
  webDir: "dist",
  plugins: {
    EdgeToEdge: {
      backgroundColor: "#2B242B",
    },
  },
};

export default config;
