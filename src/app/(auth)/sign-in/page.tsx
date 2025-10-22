import { Metadata } from "next";
import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import SignInClientPage from "./sign-in.client";
import { REDIRECT_AFTER_SIGN_IN } from "@/constants";
import { resolveRedirectPath } from "@/utils/redirect";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Access your account",
};

const SignInPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) => {
  const params = await searchParams;
  const redirectParam = params.redirect;
  const session = await getSessionFromCookie();
  const redirectPath = resolveRedirectPath(redirectParam, REDIRECT_AFTER_SIGN_IN);

  if (session) {
    return redirect(redirectPath);
  }

  return (
    <SignInClientPage redirectPath={redirectPath} />
  )
}

export default SignInPage;
