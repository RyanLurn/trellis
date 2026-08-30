interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv extends Readonly<
  // oxlint-disable-next-line typescript/consistent-type-imports
  import("@/config/env/vite").ViteEnv
> {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
