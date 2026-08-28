import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig, mergeConfig } from "vitest/config";

import { sharedConfig } from "./shared.config.ts";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    plugins: [
      cloudflareTest({
        wrangler: { configPath: "./wrangler.jsonc" },
      }),
    ],
    test: {
      typecheck: {
        enabled: true,
      },
    },
  }),
);
