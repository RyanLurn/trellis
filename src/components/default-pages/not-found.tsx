export function DefaultNotFoundPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <p className="text-destructive text-xl font-semibold">404 Not Found</p>
        <h1 className="text-foreground mt-2 text-2xl font-extrabold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="text-muted-foreground mt-4 text-base">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist.
        </p>
      </div>
    </div>
  );
}
