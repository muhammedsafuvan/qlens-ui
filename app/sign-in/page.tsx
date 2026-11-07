import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth-panel";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to explore the QLens dashboard.",
};

export default function SignInPage() {
  return <AuthPanel mode="sign-in" />;
}