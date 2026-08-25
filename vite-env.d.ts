interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv extends Readonly<
  // oxlint-disable-next-line typescript/consistent-type-imports
  import("@/features/auth/schemas/env/vite").AuthViteEnv
> {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
