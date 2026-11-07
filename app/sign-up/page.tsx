import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth-panel";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a QLens account.",
};

export default function SignUpPage() {
  return <AuthPanel mode="sign-up" />;
}