
import Link from "next/link";
import { Activity, ArrowRight, Plug } from "lucide-react";
export const instant = false;
export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Page introduction */}
      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-[#292532]">
          Background jobs at a glance
        </h2>

        <p className="mt-2 text-sm text-[#777481]">
          Monitor execution health, recent failures, and job activity.
        </p>
      </section>

      {/* First run state */}
      <section className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-[#EBE9EF] bg-white px-6 py-12 text-center">
        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#F3EFFB] text-[#7546D8]">
          <Activity size={26} strokeWidth={1.7} />
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-[#292532]">
          No job activity yet
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-[#777481]">
          Connect your Celery application to start monitoring background
          job executions, retries, and failures in one place.
        </p>

        <Link
          href="/integrations"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#7546D8] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#6337C3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7546D8] focus-visible:ring-offset-2"
        >
          <Plug size={16} />
          Set up integration
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* Future dashboard sections */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[#EBE9EF] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#292532]">
            Job health
          </h3>

          <p className="mt-2 text-sm text-[#92909B]">
            Execution metrics will appear when your application starts
            sending events.
          </p>
        </div>

        <div className="rounded-xl border border-[#EBE9EF] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#292532]">
            Recent failures
          </h3>

          <p className="mt-2 text-sm text-[#92909B]">
            Failed jobs and their debugging information will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}
