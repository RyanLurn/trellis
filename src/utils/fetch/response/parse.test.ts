import { describe, expect, test } from "vitest";
import { z } from "zod";

import { ValidationError } from "@/utils/error/classes/validation";
import { parseResponse } from "@/utils/fetch/response/parse";

// Happy path
test("parseResponse function should parse valid response", async () => {
  const body = { data: "test data" };
  const response = Response.json(body);
  const schema = z.object({ data: z.string() });

  const result = await parseResponse({ response, schema });

  expect.assert(result.ok === true);
  expect(result.data).toMatchObject(body);
});

// Sad paths
describe("parseResponse function should", async () => {
  test("return a validation error on invalid data", async () => {
    const body = { data: "test data" };
    const response = Response.json(body);
    const schema = z.object({ ok: z.literal(true), data: z.string() });

    const result = await parseResponse({ response, schema });

    expect.assert(result.ok === false);
    expect(result.error).toBeInstanceOf(ValidationError);
  });
});
