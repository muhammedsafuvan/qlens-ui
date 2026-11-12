
import Link from "next/link";
import { Activity, ShieldCheck, Zap } from "lucide-react";

import { GoogleLoginButton } from "@/components/auth/google-login-button";

export const instant = false;

const features = [
  {
    icon: Activity,
    title: "Real time job visibility",
    description:
      "Monitor Celery task executions, statuses, and lifecycle events from one dashboard.",
  },
  {
    icon: Zap,
    title: "Faster debugging",
    description:
      "Understand what happened to your background jobs without digging through scattered logs.",
  },
  {
    icon: ShieldCheck,
    title: "Developer focused",
    description:
      "Connect your workers using the QLens SDK and keep your existing infrastructure.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#7546D8] text-white">
            <Activity className="size-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight">QLens</span>
        </Link>

        <span className="text-sm text-muted-foreground">
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
            Docs
          </Link>
        </span>
      </header>

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-24 text-center lg:px-8 lg:pt-32">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
          <span className="size-2 rounded-full bg-[#7546D8]" />
          Observability for Celery workers
        </div>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
          See what your background jobs are{" "}
          <span className="text-[#7546D8]">really doing.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          Monitor, understand, and debug your Celery background tasks with
          real time visibility into every job execution.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <GoogleLoginButton />
          <p className="text-xs text-muted-foreground">
            Sign in with Google to get started.
          </p>
        </div>

        <div className="mt-20 grid w-full gap-6 text-left md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-[#7546D8]/10 text-[#7546D8]">
                  <Icon className="size-5" />
                </div>

                <h2 className="text-base font-semibold">
                  {feature.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row lg:px-8">
          <p>© 2026 QLens. All rights reserved.</p>
          <p>Built for developers who run background jobs.</p>
        </div>
      </footer>
    </main>
  );
}
