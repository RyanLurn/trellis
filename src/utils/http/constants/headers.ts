import type { ValueOf } from "@/types/object";

export const HTTP_HEADER_RECORD = {
  CONTENT_TYPE: "content-type",
  COOKIE: "cookie",
  RETRY_AFTER: "retry-after",
} as const;

export type HttpHeader = ValueOf<typeof HTTP_HEADER_RECORD>;
