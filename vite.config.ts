import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig, mergeConfig } from "vite";

import { sharedConfig } from "./shared.config";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [cloudflare({ viteEnvironment: { name: "ssr" } })],
  }),
);
