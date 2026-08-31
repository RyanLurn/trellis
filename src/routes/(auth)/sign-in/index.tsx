import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { RedirectSearchParamSchema } from "@/utils/schemas/redirect";

export const Route = createFileRoute("/(auth)/sign-in/")({
  validateSearch: RedirectSearchParamSchema,
  component: SignInPage,
});

function SignInPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate({ from: "/sign-in/" });

  return <div>Hello "/(auth)/sign-in/"!</div>;
}
