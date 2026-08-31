import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { toast } from "@/components/ui/toast";
import { authClient } from "@/features/auth/client";
import { SignInParamsSchema } from "@/features/auth/schemas";
import { useAppForm } from "@/lib/form/hooks";
import { RedirectSearchParamSchema } from "@/utils/schemas/redirect";

export const Route = createFileRoute("/(auth)/sign-in/")({
  validateSearch: RedirectSearchParamSchema,
  component: SignInPage,
});

function SignInPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate({ from: "/sign-in/" });

  const signInForm = useAppForm({
    formId: "sign-in-form",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validators: {
      onSubmit: SignInParamsSchema,
    },
    onSubmit: async ({ value }) => {
      // The SignInParamsSchema transforms email.
      // However, TanStack Form doesn't use the output of validators for the value.
      // So, we need to parse it again here to get the transformed email.
      const { email, password, rememberMe } = SignInParamsSchema.parse(value);

      // Sign in operation
      const { data } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      // Handle success case
      if (data) {
        toast.add({
          type: "success",
          title: "Sign up succeeded",
          description: `Welcome back, ${data.user.name}.`,
        });
        await navigate({ to: redirect ?? "/account" });
        return;
      }
    },
  });

  return <div>Hello "/(auth)/sign-in/"!</div>;
}
