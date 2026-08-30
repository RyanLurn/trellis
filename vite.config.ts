/// <reference types="vitest/config" />

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import {
  VITE_ENV_KEY_PREFIX,
  ViteEnvVarsSchema,
} from "./src/config/env/vite.ts";

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), VITE_ENV_KEY_PREFIX);
  const parseEnvResult = ViteEnvVarsSchema.safeParse(viteEnv, {
    reportInput: true,
  });
  if (!parseEnvResult.success) {
    console.error(parseEnvResult.error.message);
    console.error(parseEnvResult.error.issues);
    process.exit(1);
  }

  return {
    plugins: [
      // Make sure that '@tanstack/react-start/plugin/vite' is passed before '@vitejs/plugin-react'
      tanstackStart({
        router: {
          quoteStyle: "double",
          semicolons: true,
        },
      }),
      babel({ presets: [reactCompilerPreset()] }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: 5173,
    },
    test: {
      typecheck: {
        enabled: true,
      },
    },
  };
});
