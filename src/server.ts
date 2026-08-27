import handler from "@tanstack/react-start/server-entry";

declare module "@tanstack/react-router" {
  interface Register {
    server: {
      requestContext: ExecutionContext;
    };
  }
}

export default {
  async fetch(request, _env, ctx) {
    return handler.fetch(request, { context: ctx });
  },
} satisfies ExportedHandler<Env>;
