import { Link } from "@tanstack/react-router";

import { Button, buttonVariants } from "@/components/ui/button";

interface DefaultErrorPageProps {
  error: Error;
  reset: () => void;
}

export function DefaultErrorPage({ error, reset }: DefaultErrorPageProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-6">
        {/* Copy */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            An unexpected error occurred. If this keeps happening, try
            refreshing the page or come back later.
          </p>
        </div>

        {/* Error message (dev-friendly) */}
        {import.meta.env.DEV && error.message && (
          <div className="rounded-lg border border-border bg-muted/50 px-3.5 py-3">
            <p className="font-mono text-xs leading-relaxed break-all text-muted-foreground">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Link to="/" className={buttonVariants({ variant: "secondary" })}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
