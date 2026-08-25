import { createRouter } from "@tanstack/react-router";

// import { DefaultErrorPage } from "@/components/default-pages/error";
import { DefaultNotFoundPage } from "@/components/default-pages/not-found";
import { routeTree } from "@/routeTree.gen";

export function getRouter() {
  const router = createRouter({
    defaultNotFoundComponent: DefaultNotFoundPage,
    // defaultErrorComponent: DefaultErrorPage,
    scrollRestoration: true,
    routeTree,
  });

  return router;
}
