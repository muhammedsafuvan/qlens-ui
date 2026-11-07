
import Link from "next/link";
import { Activity, ArrowLeft, ArrowRight } from "lucide-react";

type AuthPanelProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthPanel({ mode }: AuthPanelProps) {
  const isSignIn = mode === "sign-in";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCFBFE] px-5 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[#756D83] transition-colors duration-300 hover:text-[#7546D8]"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="rounded-2xl border border-[#EEEAF4] bg-white p-7 shadow-xl shadow-[#39245F]/5 sm:p-9">
          <Link href="/" className="mb-8 flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#7546D8] text-white">
              <Activity size={21} />
            </span>
            <span className="text-xl font-semibold tracking-tight text-[#211936]">
              QLens
            </span>
          </Link>

          <p className="text-sm font-semibold text-[#7546D8]">
            {isSignIn ? "Welcome back" : "Get started"}
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#211936]">
            {isSignIn ? "Sign in to QLens" : "Create your account"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#756D83]">
            {isSignIn
              ? "Continue to your background job dashboard."
              : "Start exploring background job observability with QLens."}
          </p>

          <div className="mt-7 rounded-xl border border-[#E7DFF5] bg-[#F8F5FD] p-4">
            <p className="text-sm font-medium text-[#6840B7]">
              Demo mode
            </p>
            <p className="mt-1 text-xs leading-5 text-[#756D83]">
              Authentication is not connected yet. The sample details below
              are for UI testing only. Continue to the dashboard to explore
              the application.
            </p>
          </div>

          <form className="mt-7 space-y-5">
            {!isSignIn && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#514763]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  defaultValue="Demo Developer"
                  className="w-full rounded-lg border border-[#E5DFEE] bg-white px-3 py-3 text-sm text-[#211936] outline-none transition-colors duration-300 placeholder:text-[#A39BAC] focus:border-[#7546D8] focus:ring-2 focus:ring-[#7546D8]/15"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#514763]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue="demo@qlens.dev"
                required
                className="w-full rounded-lg border border-[#E5DFEE] bg-white px-3 py-3 text-sm text-[#211936] outline-none transition-colors duration-300 placeholder:text-[#A39BAC] focus:border-[#7546D8] focus:ring-2 focus:ring-[#7546D8]/15"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#514763]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  isSignIn ? "current-password" : "new-password"
                }
                defaultValue="demo-password"
                required
                minLength={8}
                className="w-full rounded-lg border border-[#E5DFEE] bg-white px-3 py-3 text-sm text-[#211936] outline-none transition-colors duration-300 placeholder:text-[#A39BAC] focus:border-[#7546D8] focus:ring-2 focus:ring-[#7546D8]/15"
              />
            </div>
          </form>

          <Link
            href="/app"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7546D8] px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#6237BF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7546D8]"
          >
            {isSignIn ? "Continue to dashboard" : "Create demo account"}
            <ArrowRight size={16} />
          </Link>

          <p className="mt-6 text-center text-sm text-[#756D83]">
            {isSignIn ? "New to QLens?" : "Already have an account?"}{" "}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="font-semibold text-[#7546D8] hover:text-[#6237BF]"
            >
              {isSignIn ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[#91899D]">
          QLens · Background job observability
        </p>
      </div>
    </main>
  );
}
