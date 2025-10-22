import { Metadata } from "next";
import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import VerifyEmailClientComponent from "./verify-email.client";
import { REDIRECT_AFTER_SIGN_IN } from "@/constants";
import { resolveRedirectPath } from "@/utils/redirect";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; redirect?: string }>;
}) {
  const params = await searchParams;
  const session = await getSessionFromCookie();
  const token = params.token;
  const redirectParam = params.redirect;
  const redirectPath = resolveRedirectPath(redirectParam, REDIRECT_AFTER_SIGN_IN);

  if (session?.user.emailVerified) {
    return redirect(redirectPath);
  }

  if (!token) {
    return redirect('/sign-in');
  }

  return <VerifyEmailClientComponent />;
}
