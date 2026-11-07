
import Link from "next/link";
import type { Metadata } from "next";
import { TaglineReveal } from "@/components/tagline-reveal";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CircleAlert,
  Clock3,
  Layers3,
  Radio,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "QLens | Background Job Observability for Celery",
  description:
    "Monitor Celery background jobs, understand task failures, and inspect execution history with QLens.",
};

const benefits = [
  {
    icon: Activity,
    title: "See job health at a glance",
    description:
      "Understand successful, failed, and retried tasks without digging through worker logs.",
  },
  {
    icon: CircleAlert,
    title: "Find failures faster",
    description:
      "Identify problematic tasks and inspect the details behind each failed execution.",
  },
  {
    icon: Clock3,
    title: "Follow execution history",
    description:
      "Trace task lifecycle events and understand what happened during an execution.",
  },
  {
    icon: Layers3,
    title: "Keep worker activity visible",
    description:
      "See the workers and queues involved in your background job processing.",
  },
];

const steps = [
  {
    number: "01",
    title: "Connect your application",
    description:
      "Add QLens instrumentation to your Python and Celery application.",
  },
  {
    number: "02",
    title: "Send task events",
    description:
      "Capture task lifecycle activity and make it available to QLens.",
  },
  {
    number: "03",
    title: "Monitor and investigate",
    description:
      "Explore job activity, inspect failures, and follow execution history.",
  },
];

const faqs = [
  {
    question: "What is QLens?",
    answer:
      "QLens is a background job observability platform designed to help developers monitor and investigate Celery task execution.",
  },
  {
    question: "Who is QLens for?",
    answer:
      "QLens is designed for developers and backend engineers who run Python applications using Celery workers.",
  },
  {
    question: "Does QLens support Celery?",
    answer:
      "Celery is the initial integration focus for QLens.",
  },
  {
    question: "Do I need to change my existing tasks?",
    answer:
      "The intended integration uses instrumentation to capture task lifecycle events. The exact setup will be documented as the integration is finalized.",
  },
  {
    question: "Can I inspect failed task executions?",
    answer:
      "The product is being built to let you inspect job details and lifecycle events, including failure information where it is available.",
  },
  {
    question: "Does QLens support multiple workers and queues?",
    answer:
      "Worker and queue information are part of the job observability experience.",
  },
  {
    question: "Is authentication available yet?",
    answer:
      "Authentication is not enabled in this initial UI milestone. You can explore the dashboard using the demo navigation.",
  },
];

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-[#E8E3F1] bg-white shadow-2xl shadow-[#39245F]/10">
        <div className="flex items-center justify-between border-b border-[#EEEAF4] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#7546D8] text-white">
              <Activity size={17} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#211936]">QLens</p>
              <p className="text-xs text-[#827A91]">Workspace overview</p>
            </div>
          </div>
          <span className="rounded-full bg-[#F2EDFC] px-3 py-1 text-xs font-medium text-[#6840B7]">
            Illustrative preview
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-[190px_1fr]">
          <aside className="hidden border-r border-[#EEEAF4] bg-[#FCFBFE] p-4 md:block">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[#9A92A8]">
              Workspace
            </p>
            {["Overview", "Jobs", "Integrations", "API keys"].map(
              (item, index) => (
                <div
                  key={item}
                  className={`mb-1 rounded-lg px-3 py-2 text-sm ${
                    index === 0
                      ? "bg-[#F0EAFB] font-medium text-[#6840B7]"
                      : "text-[#756D83]"
                  }`}
                >
                  {item}
                </div>
              ),
            )}
          </aside>

          <div className="min-w-0 p-5 sm:p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-[#211936]">
                  Job activity
                </p>
                <p className="mt-1 text-sm text-[#827A91]">
                  A sample view of your background tasks
                </p>
              </div>
              <span className="flex items-center gap-2 text-xs text-[#6D647B]">
                <span className="size-2 rounded-full bg-[#2DA77A]" />
                Sample data
              </span>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Total jobs", "—"],
                ["Successful", "—"],
                ["Failed", "—"],
                ["Retried", "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-[#EEEAF4] p-4"
                >
                  <p className="text-xs text-[#827A91]">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-[#211936]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-[#EEEAF4]">
              <div className="flex items-center justify-between border-b border-[#EEEAF4] px-4 py-3">
                <p className="text-sm font-semibold text-[#211936]">
                  Recent executions
                </p>
                <span className="text-xs text-[#827A91]">Sample rows</span>
              </div>

              {[
                ["send_welcome_email", "Completed", "worker-01"],
                ["process_payment", "Failed", "worker-02"],
                ["generate_report", "Retried", "worker-01"],
              ].map(([name, status, worker]) => (
                <div
                  key={name}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-[#F1EEF5] px-4 py-3 last:border-0 sm:grid-cols-[1fr_100px_110px]"
                >
                  <span className="truncate font-mono text-xs text-[#514763]">
                    {name}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-center text-xs ${
                      status === "Failed"
                        ? "bg-[#FDECEC] text-[#B84949]"
                        : status === "Retried"
                          ? "bg-[#FFF4E4] text-[#A66A20]"
                          : "bg-[#EAF7F1] text-[#27845F]"
                    }`}
                  >
                    {status}
                  </span>
                  <span className="hidden text-xs text-[#827A91] sm:block">
                    {worker}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-5 -right-3 -z-10 size-40 rounded-full bg-[#EEE7FA] blur-3xl" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FCFBFE] text-[#211936]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[#EEEAF4] bg-white/95 backdrop-blur">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#7546D8] text-white">
              <Activity size={20} />
            </span>
            <span className="text-xl font-semibold tracking-tight">
              QLens
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-[#6F667E] transition-colors duration-300 hover:text-[#7546D8]"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-[#6F667E] transition-colors duration-300 hover:text-[#7546D8]"
            >
              How it works
            </a>
            <a
              href="#faq"
              className="text-sm text-[#6F667E] transition-colors duration-300 hover:text-[#7546D8]"
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#514763] transition-colors duration-300 hover:text-[#7546D8] sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-lg bg-[#7546D8] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#6237BF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7546D8]"
            >
              Get started <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      </header>

      <section
        id="main-content"
        className="px-5 pb-24 pt-20 sm:px-8 sm:pt-28"
      >
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[#E7DFF5] bg-white px-4 py-2 text-xs font-medium text-[#6840B7]">
            <span className="size-2 rounded-full bg-[#7546D8]" />
            Background job observability for developers
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#211936] text-balance sm:text-5xl lg:text-6xl">
            Know what your background jobs are doing.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#756D83] text-pretty sm:text-lg">
            Monitor Celery tasks, spot failures, and inspect execution history
            from one focused dashboard.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7546D8] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#6237BF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7546D8] sm:w-auto"
            >
              Get started <ArrowRight size={17} />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex w-full items-center justify-center rounded-lg border border-[#E5DFEE] bg-white px-6 py-3 text-sm font-semibold text-[#514763] transition-colors duration-300 hover:border-[#C9B9E8] hover:text-[#6840B7] sm:w-auto"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-5 text-xs text-[#91899D]">
            Designed for Python applications using Celery.
          </p>

          <div className="mt-16 sm:mt-20">
            <ProductPreview />
          </div>
        </div>
      </section>

      <section id="features" className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#7546D8]">
              Built for background work
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#211936] text-balance sm:text-4xl">
              Understand every task beyond its status.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#756D83]">
              Get the context you need to understand what your workers are
              processing and where executions go wrong.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-[#EEEAF4] bg-[#FCFBFE] p-6 transition-colors duration-300 hover:border-[#D8C9F0]"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#F0EAFB] text-[#7546D8]">
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#211936]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#756D83]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold text-[#7546D8]">
            A clearer picture of your workers
            </p>

            <div className="mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[#211936] text-balance sm:text-5xl">
            <TaglineReveal />
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#756D83]">
            Your background jobs are part of your product. They deserve the
            same visibility as the rest of your application.
            </p>
        </div>
        </section>

      <section
        id="how-it-works"
        className="bg-white px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-[#7546D8]">
              Getting started
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#211936] text-balance sm:text-4xl">
              From task execution to useful insight.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="rounded-2xl border border-[#EEEAF4] p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#7546D8]">
                    {step.number}
                  </span>
                  {index === 0 ? (
                    <Workflow className="text-[#A18BCB]" />
                  ) : index === 1 ? (
                    <Radio className="text-[#A18BCB]" />
                  ) : (
                    <ShieldCheck className="text-[#A18BCB]" />
                  )}
                </div>
                <h3 className="mt-7 text-xl font-semibold text-[#211936]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#756D83]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-[#7546D8]">
              Questions
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#211936] sm:text-4xl">
              Things you might want to know.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#756D83]">
              A few details about QLens and what we are building.
            </p>
          </div>

          <div className="divide-y divide-[#EAE5F0]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-[#211936] marker:content-none">
                  {faq.question}
                  <span className="text-xl text-[#7546D8] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756D83]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#211936] px-7 py-16 text-center sm:px-12">
          <p className="text-sm font-medium text-[#C7B5EB]">
            Your workers. Your visibility.
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold text-white text-balance sm:text-4xl">
            Make background job failures easier to understand.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#D0C8DC]">
            Explore the QLens dashboard and see how task observability can fit
            into your development workflow.
          </p>
          <Link
            href="/sign-up"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#6840B7] transition-colors duration-300 hover:bg-[#F0EAFB]"
          >
            Get started <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#EEEAF4] bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#7546D8] text-white">
              <Activity size={17} />
            </span>
            QLens
          </Link>
          <p className="text-xs text-[#91899D]">
            Background job observability for developers.
          </p>
          <div className="flex gap-5 text-xs text-[#756D83]">
            <Link href="/sign-in" className="hover:text-[#7546D8]">
              Sign in
            </Link>
            <Link href="/sign-up" className="hover:text-[#7546D8]">
              Get started
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
