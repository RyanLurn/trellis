import { describe, expect, test } from "vitest";
import { z } from "zod";

import { InvalidJsonError } from "@/utils/error/classes/invalid-json";
import { UnexpectedError } from "@/utils/error/classes/unexpected";
import { ValidationError } from "@/utils/error/classes/validation";
import { parseResponse } from "@/utils/fetch/parse-response";

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

  test("return an invalid JSON error on invalid json body", async () => {
    const body = `{ data: "test data" `;
    const response = new Response(body);
    const schema = z.object({ data: z.string() });

    const result = await parseResponse({ response, schema });

    expect.assert(result.ok === false);
    expect(result.error).toBeInstanceOf(InvalidJsonError);
  });

  test("return an unexpected error on consumed body stream", async () => {
    const body = { data: "test data" };
    const response = Response.json(body);
    const schema = z.object({ data: z.string() });

    // Consume the body stream before parsing
    const _text = await response.text();
    const result = await parseResponse({ response, schema });

    expect.assert(result.ok === false);

    const error = result.error;
    expect.assert(error instanceof UnexpectedError === true);
    expect(error.cause).toBeInstanceOf(TypeError);
  });
});
