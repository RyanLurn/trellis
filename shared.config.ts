import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export const sharedConfig = defineConfig({
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
});
