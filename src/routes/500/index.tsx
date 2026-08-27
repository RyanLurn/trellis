import { createFileRoute, Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_ERROR_MESSAGE } from "@/utils/error/constants";
import { RedirectSearchParamSchema } from "@/utils/schemas/redirect";

export const Route = createFileRoute("/500/")({
  validateSearch: RedirectSearchParamSchema,
  component: InternalServerErrorPage,
});

function InternalServerErrorPage() {
  const { redirect } = Route.useSearch();
  const linkClassName = buttonVariants({ variant: "outline" });

  return (
    <div className="typeset flex h-full flex-col items-center justify-center gap-y-3">
      <h1 className="text-destructive">500 - Internal server error</h1>
      <p>{DEFAULT_ERROR_MESSAGE}</p>
      {redirect ? (
        <Link className={linkClassName} to={redirect}>
          Retry
        </Link>
      ) : (
        <Link className={linkClassName} to="/">
          Back to Home page
        </Link>
      )}
    </div>
  );
}
