import { REDIRECT_AFTER_SIGN_IN } from "@/constants";

export function resolveRedirectPath(
  redirectParam: string | undefined,
  fallback: string = REDIRECT_AFTER_SIGN_IN,
): string {
  if (!redirectParam) {
    return fallback;
  }

  if (redirectParam.startsWith("/") && !redirectParam.startsWith("//")) {
    return redirectParam;
  }

  return fallback;
}
