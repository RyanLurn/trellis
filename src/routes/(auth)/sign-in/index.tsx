import { useSelector } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BASE_ERROR_CODES } from "better-auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/features/auth/client";
import { MIN_PASSWORD_LENGTH } from "@/features/auth/constants";
import {
  EmailSchema,
  PasswordSchema,
  SignInParamsSchema,
} from "@/features/auth/schemas";
import { useAppForm } from "@/lib/form/hooks";
import { DEFAULT_ERROR_MESSAGE } from "@/utils/error/constants";
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
    onSubmit: async ({ value, formApi }) => {
      // The SignInParamsSchema transforms email.
      // However, TanStack Form doesn't use the output of validators for the value.
      // So, we need to parse it again here to get the transformed email.
      const { email, password, rememberMe } = SignInParamsSchema.parse(value);

      // Sign in operation
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      // Handle success case
      if (data) {
        toast.add({
          type: "success",
          title: "Sign in succeeded",
          description: `Welcome back, ${data.user.name}.`,
        });
        await navigate({ to: redirect ?? "/account" });
        return;
      }

      // Handle error cases
      const errorCode = error.code;

      if (errorCode === BASE_ERROR_CODES.INVALID_EMAIL.code) {
        formApi.setFieldMeta("email", (prev) => ({
          ...prev,
          errorMap: {
            onServer: [
              {
                message:
                  error.message ?? BASE_ERROR_CODES.INVALID_EMAIL.message,
              },
            ],
          },
        }));
        return;
      }

      toast.add({
        type: "error",
        title: "Sign in failed",
        description: error.message ?? DEFAULT_ERROR_MESSAGE,
      });
      return;
    },
  });

  const isSubmitting = useSelector(
    signInForm.store,
    (state) => state.isSubmitting,
  );

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full sm:max-w-sm">
        {/* Form card's header */}
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials below to sign in.
          </CardDescription>
        </CardHeader>
        {/* Form card's content */}
        <CardContent>
          {/* Form element */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void signInForm.handleSubmit();
            }}
            id={signInForm.formId}
          >
            <FieldGroup>
              {/* Email field */}
              <signInForm.AppField
                name="email"
                validators={{
                  onChange: EmailSchema,
                }}
              >
                {({ TextField }) => (
                  <TextField
                    placeholder="youremail@example.com"
                    disabled={isSubmitting}
                    label="Email"
                    type="email"
                  />
                )}
              </signInForm.AppField>
              {/* Password field */}
              <signInForm.AppField
                name="password"
                validators={{
                  onChange: PasswordSchema,
                }}
              >
                {({ TextField }) => (
                  <TextField
                    placeholder={"*".repeat(MIN_PASSWORD_LENGTH)}
                    disabled={isSubmitting}
                    label="Password"
                    type="password"
                  />
                )}
              </signInForm.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        {/* Form card's footer */}
        <CardFooter className="flex-col gap-y-2"></CardFooter>
      </Card>
    </div>
  );
}
