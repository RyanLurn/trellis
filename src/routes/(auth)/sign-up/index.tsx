import { useSelector } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

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
import {
  EmailSchema,
  NameSchema,
  SignUpParamsSchema,
} from "@/features/auth/schemas";
import { useAppForm } from "@/lib/form/hooks";
import { DEFAULT_ERROR_MESSAGE } from "@/utils/error/constants";
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
      const errorCode = error.code;

      if (errorCode === authClient.$ERROR_CODES.INVALID_EMAIL.code) {
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
        return;
      }

      if (
        errorCode === authClient.$ERROR_CODES.INVALID_PASSWORD.code ||
        errorCode === authClient.$ERROR_CODES.PASSWORD_TOO_SHORT.code ||
        errorCode === authClient.$ERROR_CODES.PASSWORD_TOO_LONG.code
      ) {
        formApi.setFieldMeta("password", (prev) => ({
          ...prev,
          errorMap: {
            onServer: [
              {
                message:
                  error.message ?? authClient.$ERROR_CODES[errorCode].message,
              },
            ],
          },
        }));
        return;
      }

      toast.add({
        type: "error",
        title: "Sign up failed",
        description: error.message ?? DEFAULT_ERROR_MESSAGE,
      });
      return;
    },
  });

  const isSubmitting = useSelector(
    signUpForm.store,
    (state) => state.isSubmitting,
  );

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full sm:max-w-sm">
        {/* Form card's header */}
        <CardHeader>
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Enter your information below to create an account.
          </CardDescription>
        </CardHeader>
        {/* Form card's content */}
        <CardContent>
          {/* Form element */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void signUpForm.handleSubmit();
            }}
            id={signUpForm.formId}
          >
            <FieldGroup>
              {/* Name field */}
              <signUpForm.AppField
                name="name"
                validators={{
                  onChange: NameSchema,
                }}
              >
                {({ TextField }) => (
                  <TextField
                    placeholder="Your Name"
                    disabled={isSubmitting}
                    label="Name"
                    type="text"
                  />
                )}
              </signUpForm.AppField>
              {/* Email field */}
              <signUpForm.AppField
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
              </signUpForm.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        {/* Form card's footer */}
        <CardFooter className="flex-col gap-y-2"></CardFooter>
      </Card>
    </div>
  );
}
