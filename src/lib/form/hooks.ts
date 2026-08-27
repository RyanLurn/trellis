import { createFormHook } from "@tanstack/react-form";

import { CheckField } from "@/lib/form/components/check-field";
import { SubmitButton } from "@/lib/form/components/submit-button";
import { TextField } from "@/lib/form/components/text-field";
import { fieldContext, formContext } from "@/lib/form/contexts";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, CheckField },
  formComponents: { SubmitButton },
});
