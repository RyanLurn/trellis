import type { ValueOf } from "@/types/object";

export const HTTP_REQUEST_METHOD_RECORD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
  PATCH: "PATCH",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  TRACE: "TRACE",
  CONNECT: "CONNECT",
} as const;

export type HttpRequestMethod = ValueOf<typeof HTTP_REQUEST_METHOD_RECORD>;
