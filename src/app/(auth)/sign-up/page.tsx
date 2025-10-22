import { Metadata } from "next";
import { getSessionFromCookie } from "@/utils/auth";
import SignUpClientComponent from "./sign-up.client";
import { redirect } from "next/navigation";
import { REDIRECT_AFTER_SIGN_IN } from "@/constants";
import { resolveRedirectPath } from "@/utils/redirect";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a new account",
};

const SignUpPage = async ({
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

  return <SignUpClientComponent redirectPath={redirectPath} />
}

export default SignUpPage;
