import type { AppError } from "@/types/error";
import type { JsonValue } from "@/types/json";
import type { Err, Ok } from "@/types/result";

export function ok<D>(data: D, metadata?: JsonValue): Ok<D> {
  return {
    ok: true,
    data,
    metadata,
  };
}

export function err<E extends AppError<string>>(
  error: E,
  metadata?: JsonValue,
): Err<E> {
  return {
    ok: false,
    error,
    metadata,
  };
}
