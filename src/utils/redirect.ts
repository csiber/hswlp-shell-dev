import type { Route } from "next";

import { REDIRECT_AFTER_SIGN_IN } from "@/constants";

export function resolveRedirectPath(
  redirectParam: string | null | undefined,
  fallback: Route = REDIRECT_AFTER_SIGN_IN,
): Route {
  if (!redirectParam) {
    return fallback;
  }

  if (redirectParam.startsWith("/") && !redirectParam.startsWith("//")) {
    return redirectParam as Route;
  }

  return fallback;
}
