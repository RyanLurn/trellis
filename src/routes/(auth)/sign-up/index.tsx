import { createFileRoute } from "@tanstack/react-router";

import { RedirectSearchParamSchema } from "@/utils/schemas/redirect";

export const Route = createFileRoute("/(auth)/sign-up/")({
  validateSearch: RedirectSearchParamSchema,
  component: SignUpPage,
});

function SignUpPage() {
  const { redirect } = Route.useSearch();

  return <div>Hello "/(auth)/sign-up/"!</div>;
}
