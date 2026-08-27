import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getAuthSessionServerFn } from "@/features/auth/ops/get-session.function";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const getAuthSessionResult = await getAuthSessionServerFn();

    if (getAuthSessionResult.ok) {
      return getAuthSessionResult.data;
    }

    const error = getAuthSessionResult.error;
    if (error.code === "UNAUTHORIZED") {
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.pathname },
      });
    }
    throw redirect({ to: "/500" });
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
