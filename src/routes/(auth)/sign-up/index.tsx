import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";

import { toast } from "@/components/ui/toast";
import { authClient } from "@/features/auth/client";
import { SignUpParamsSchema } from "@/features/auth/schemas";
import { useAppForm } from "@/lib/form/hooks";
import { RedirectSearchParamSchema } from "@/utils/schemas/redirect";

export const Route = createFileRoute("/(auth)/sign-up/")({
  validateSearch: RedirectSearchParamSchema,
  component: SignUpPage,
});

function SignUpPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate({ from: `${Route.path}/` });

  const signUpForm = useAppForm({
    formId: "sign-up-form",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: SignUpParamsSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      // The SignUpParamsSchema transforms name and email.
      // However, TanStack Form doesn't use the output of validators for the value.
      // So, we need to parse it again here to get the transformed name and email.
      const { name, email, password } = SignUpParamsSchema.parse(value);

      // Sign up operation
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      // Handle success case
      if (data) {
        toast.add({
          type: "success",
          title: "Sign up succeeded",
          description: `Welcome, ${data.user.name}.`,
        });
        await navigate({ to: redirect ?? "/account" });
        return;
      }

      // Handle error cases
      if (error.code === authClient.$ERROR_CODES.INVALID_EMAIL.code) {
        formApi.setFieldMeta("email", (prev) => ({
          ...prev,
          errorMap: {
            onServer: [
              {
                message:
                  error.message ??
                  authClient.$ERROR_CODES.INVALID_EMAIL.message,
              },
            ],
          },
        }));
      }
    },
  });

  return <div>Hello "/(auth)/sign-up/"!</div>;
}
