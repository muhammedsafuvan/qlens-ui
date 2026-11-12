"use client";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDashed,
  Clock3,
  LoaderCircle,
  RefreshCw,
  Server,
  Terminal,
  XCircle,
} from "lucide-react";

import {
  getJobDetails,
  listJobs,
  type Job,
  type JobDetail,
} from "@/lib/api/jobs";


function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function formatRelativeTime(value: string): string {
  const date = new Date(value);
  const timestamp = date.getTime();

  if (Number.isNaN(timestamp)) {
    return value;
  }

  const seconds = Math.round((timestamp - Date.now()) / 1000);
  const absoluteSeconds = Math.abs(seconds);

  if (absoluteSeconds < 60) {
    return seconds <= 0 ? `${absoluteSeconds}s ago` : `in ${seconds}s`;
  }

  const minutes = Math.round(absoluteSeconds / 60);

  if (minutes < 60) {
    return seconds <= 0 ? `${minutes}m ago` : `in ${minutes}m`;
  }

  const hours = Math.round(minutes / 60);

  if (hours < 24) {
    return seconds <= 0 ? `${hours}h ago` : `in ${hours}h`;
  }

  const days = Math.round(hours / 24);

  return seconds <= 0 ? `${days}d ago` : `in ${days}d`;
}

function getStatusStyle(status: string): string {
  switch (status.toLowerCase()) {
    case "succeeded":
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "failed":
    case "failure":
    case "error":
      return "border-red-200 bg-red-50 text-red-700";

    case "started":
    case "running":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "retry":
    case "retried":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "received":
    case "queued":
    case "pending":
      return "border-[#E5DDF7] bg-[#F7F4FC] text-[#7546D8]";

    default:
      return "border-[#E8E7EB] bg-[#F7F7F8] text-[#777481]";
  }
}

function StatusIcon({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  if (normalized === "succeeded" || normalized === "success") {
    return <CheckCircle2 className="size-4 text-emerald-600" />;
  }

  if (
    normalized === "failed" ||
    normalized === "failure" ||
    normalized === "error"
  ) {
    return <XCircle className="size-4 text-red-600" />;
  }

  if (normalized === "started" || normalized === "running") {
    return <span className="size-2 rounded-full bg-blue-500" />;
  }

  if (normalized === "retry" || normalized === "retried") {
    return <RefreshCw className="size-4 text-amber-600" />;
  }

  return <CircleDashed className="size-4 text-[#7546D8]" />;
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${getStatusStyle(status)}`}
    >
      <StatusIcon status={status} />
      {status}
    </span>
  );
}

function MetadataItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-[#A09DA9]">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] text-[#92909B]">{label}</p>
        <p className="truncate text-xs font-medium text-[#514D5B]">
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}

function EventTimeline({ detail }: { detail: JobDetail }) {
  const events = [...detail.events].sort(
    (a, b) =>
      new Date(a.occurred_at).getTime() -
      new Date(b.occurred_at).getTime(),
  );

  if (events.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#E8E5EE] bg-white px-5 py-8 text-center">
        <Activity className="mx-auto size-5 text-[#AAA6B2]" />
        <p className="mt-2 text-sm font-medium text-[#514D5B]">
          No events recorded
        </p>
        <p className="mt-1 text-xs text-[#92909B]">
          Events for this execution will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const isFailed =
          event.event_type.toLowerCase() === "failed" ||
          Boolean(event.exception_type);

        return (
          <div key={event.event_id} className="relative flex gap-3">
            <div className="flex w-5 shrink-0 flex-col items-center">
              <div
                className={`z-10 mt-1 flex size-5 items-center justify-center rounded-full border ${
                  isFailed
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-[#E5DDF7] bg-[#F7F4FC] text-[#7546D8]"
                }`}
              >
                {isFailed ? (
                  <XCircle size={12} />
                ) : (
                  <Activity size={11} />
                )}
              </div>

              {!isLast && (
                <div className="w-px flex-1 bg-[#EAE7F0]" />
              )}
            </div>

            <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-5"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold capitalize text-[#393542]">
                  {event.event_type.replaceAll("_", " ")}
                </p>

                <time
                  className="text-[11px] text-[#92909B]"
                  dateTime={event.occurred_at}
                  title={formatDate(event.occurred_at)}
                >
                  {formatRelativeTime(event.occurred_at)}
                </time>
              </div>

              <div className="mt-2 grid gap-x-6 gap-y-3 rounded-lg border border-[#EFEDF2] bg-white p-3 sm:grid-cols-2 lg:grid-cols-3">
                <MetadataItem
                  icon={<Clock3 size={13} />}
                  label="Occurred at"
                  value={formatDate(event.occurred_at)}
                />
                <MetadataItem
                  icon={<Server size={13} />}
                  label="Worker"
                  value={event.worker_name}
                />
                <MetadataItem
                  icon={<Activity size={13} />}
                  label="Queue"
                  value={event.queue_name}
                />
                <MetadataItem
                  icon={<RefreshCw size={13} />}
                  label="Attempt"
                  value={event.attempt}
                />
                <MetadataItem
                  icon={<ArrowUp size={13} />}
                  label="Exchange"
                  value={event.exchange}
                />
                <MetadataItem
                  icon={<ArrowDown size={13} />}
                  label="Routing key"
                  value={event.routing_key}
                />
              </div>

              {event.exception_type && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50/70 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-700">
                    <AlertCircle size={14} />
                    {event.exception_type}
                  </div>

                  {event.exception_message && (
                    <p className="mt-2 whitespace-pre-wrap break-words text-xs leading-5 text-red-700">
                      {event.exception_message}
                    </p>
                  )}

                  {event.traceback && (
                    <details className="mt-3">
                      <summary className="flex cursor-pointer items-center gap-2 text-xs font-medium text-red-700">
                        <Terminal size={13} />
                        View traceback
                      </summary>
                      <pre className="mt-2 max-h-72 overflow-auto rounded-md border border-red-100 bg-white p-3 font-mono text-[11px] leading-5 whitespace-pre-wrap break-words text-[#514D5B]">
                        {event.traceback}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function JobRow({
  job,
  expanded,
  detail,
  detailLoading,
  detailError,
  onToggle,
}: {
  job: Job;
  expanded: boolean;
  detail?: JobDetail;
  detailLoading: boolean;
  detailError?: string;
  onToggle: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#EAE8EF] bg-white transition-colors hover:border-[#D9D0EB]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="grid w-full gap-4 px-4 py-4 text-left transition-colors hover:bg-[#FCFBFE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7546D8] md:grid-cols-[minmax(0,1.7fr)_minmax(130px,0.8fr)_minmax(130px,0.8fr)_minmax(100px,0.7fr)_24px] md:items-center md:px-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F5F1FC] text-[#7546D8]">
            <Terminal size={17} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#393542]">
              {job.task_name}
            </p>
            <p className="mt-1 truncate font-mono text-[11px] text-[#92909B]">
              {job.task_id}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:block">
          <span className="text-[11px] text-[#92909B] md:hidden">
            Status
          </span>
          <StatusBadge status={job.status} />
        </div>

        <div className="flex items-center justify-between gap-3 md:block">
          <span className="text-[11px] text-[#92909B] md:hidden">
            Worker
          </span>
          <p className="truncate text-xs font-medium text-[#514D5B]">
            {job.worker_name ?? "—"}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 md:block">
          <span className="text-[11px] text-[#92909B] md:hidden">
            Last event
          </span>
          <time
            className="text-xs text-[#777481]"
            dateTime={job.occurred_at}
            title={formatDate(job.occurred_at)}
          >
            {formatRelativeTime(job.occurred_at)}
          </time>
        </div>

        <span className="hidden justify-self-end text-[#92909B] md:block">
          {expanded ? (
            <ChevronDown size={17} />
          ) : (
            <ChevronRight size={17} />
          )}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-[#EFEDF2] bg-[#FAF9FC] px-4 py-5 md:px-5">
          <div className="mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetadataItem
              icon={<Server size={14} />}
              label="Worker"
              value={job.worker_name}
            />
            <MetadataItem
              icon={<Activity size={14} />}
              label="Queue"
              value={job.queue_name}
            />
            <MetadataItem
              icon={<RefreshCw size={14} />}
              label="Attempt"
              value={job.attempt}
            />
            <MetadataItem
              icon={<Clock3 size={14} />}
              label="Occurred at"
              value={formatDate(job.occurred_at)}
            />
          </div>

          {(job.exception_type || job.exception_message) && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="flex items-center gap-2 text-xs font-semibold text-red-700">
                <AlertCircle size={14} />
                {job.exception_type ?? "Job exception"}
              </p>
              {job.exception_message && (
                <p className="mt-2 whitespace-pre-wrap break-words text-xs leading-5 text-red-700">
                  {job.exception_message}
                </p>
              )}
            </div>
          )}

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#393542]">
                Execution timeline
              </h3>
              <p className="mt-1 text-xs text-[#92909B]">
                Events recorded for this task execution.
              </p>
            </div>

            {detail && (
              <span className="rounded-full border border-[#E8E5EE] bg-white px-2.5 py-1 text-[11px] font-medium text-[#777481]">
                {detail.events.length}{" "}
                {detail.events.length === 1 ? "event" : "events"}
              </span>
            )}
          </div>

          {detailLoading && (
            <div className="flex items-center gap-2 rounded-lg border border-[#EAE8EF] bg-white px-4 py-6 text-sm text-[#777481]">
              <LoaderCircle className="size-4 animate-spin text-[#7546D8]" />
              Loading execution events...
            </div>
          )}

          {detailError && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <div>
                <p className="font-medium">Unable to load execution events</p>
                <p className="mt-1 text-xs">{detailError}</p>
              </div>
            </div>
          )}

          {!detailLoading && !detailError && detail && (
            <EventTimeline detail={detail} />
          )}
        </div>
      )}
    </article>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const [details, setDetails] = useState<Record<string, JobDetail>>({});
  const [detailLoading, setDetailLoading] = useState<
    Record<string, boolean>
  >({});
  const [detailErrors, setDetailErrors] = useState<
    Record<string, string>
  >({});

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await listJobs(10);
      setJobs(result.items);
      setTotal(result.total);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load jobs.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadJobs();
  }, [loadJobs]);

  const handleToggle = async (taskId: string) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null);
      return;
    }

    setExpandedTaskId(taskId);

    if (details[taskId] || detailLoading[taskId]) {
      return;
    }

    setDetailLoading((current) => ({
      ...current,
      [taskId]: true,
    }));

    setDetailErrors((current) => ({
      ...current,
      [taskId]: "",
    }));

    try {
      const result = await getJobDetails(taskId);

      setDetails((current) => ({
        ...current,
        [taskId]: result,
      }));
    } catch (err) {
      setDetailErrors((current) => ({
        ...current,
        [taskId]:
          err instanceof Error
            ? err.message
            : "Unable to load job details.",
      }));
    } finally {
      setDetailLoading((current) => ({
        ...current,
        [taskId]: false,
      }));
    }
  };

  const handleRetryDetails = async (taskId: string) => {
    setDetails((current) => {
      const next = { ...current };
      delete next[taskId];
      return next;
    });

    setDetailErrors((current) => ({
      ...current,
      [taskId]: "",
    }));

    setDetailLoading((current) => ({
      ...current,
      [taskId]: false,
    }));

    setExpandedTaskId(null);

    await Promise.resolve();

    setExpandedTaskId(taskId);

    setDetailLoading((current) => ({
      ...current,
      [taskId]: true,
    }));

    try {
      const result = await getJobDetails(taskId);

      setDetails((current) => ({
        ...current,
        [taskId]: result,
      }));
    } catch (err) {
      setDetailErrors((current) => ({
        ...current,
        [taskId]:
          err instanceof Error
            ? err.message
            : "Unable to load job details.",
      }));
    } finally {
      setDetailLoading((current) => ({
        ...current,
        [taskId]: false,
      }));
    }
  };

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-[#292532]">
              Jobs explorer
            </h2>
            <span className="rounded-full border border-[#E8E5EE] bg-white px-2.5 py-1 text-xs font-medium text-[#777481]">
              {total} total
            </span>
          </div>

          <p className="mt-2 text-sm text-[#777481]">
            Search and inspect background job executions across your
            workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadJobs()}
          disabled={loading}
          className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border border-[#E8E5EE] bg-white px-3 text-xs font-medium text-[#514D5B] transition-colors hover:bg-[#F8F6FB] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw
            size={14}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-sm font-semibold text-[#393542]">
              Recent executions
            </h3>
            <p className="mt-1 text-xs text-[#92909B]">
              Showing the latest 10 job executions.
            </p>
          </div>
        </div>

        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-4 rounded-xl border border-[#EAE8EF] bg-white px-5 py-5"
              >
                <div className="size-9 rounded-lg bg-[#F0EDF4]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/3 rounded bg-[#F0EDF4]" />
                  <div className="h-2.5 w-1/2 rounded bg-[#F5F3F7]" />
                </div>
                <div className="h-6 w-20 rounded-full bg-[#F0EDF4]" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-center">
            <AlertCircle className="mx-auto size-6 text-red-600" />
            <h3 className="mt-3 text-sm font-semibold text-red-800">
              Unable to load jobs
            </h3>
            <p className="mt-1 text-xs text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => void loadJobs()}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-red-200 transition-colors hover:bg-red-50"
            >
              <RefreshCw size={13} />
              Try again
            </button>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-[#E4DFEC] bg-white px-6 py-10 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F3EFFB] text-[#7546D8]">
              <Activity size={23} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#393542]">
              No jobs found
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#92909B]">
              Once your Celery application starts sending events, its job
              executions will appear here.
            </p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="space-y-2">
            {jobs.map((job) => (
              <div key={job.task_id}>
                <JobRow
                  job={job}
                  expanded={expandedTaskId === job.task_id}
                  detail={details[job.task_id]}
                  detailLoading={Boolean(detailLoading[job.task_id])}
                  detailError={detailErrors[job.task_id] || undefined}
                  onToggle={() => void handleToggle(job.task_id)}
                />

                {expandedTaskId === job.task_id &&
                  detailErrors[job.task_id] && (
                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => void handleRetryDetails(job.task_id)}
                        className="text-xs font-medium text-[#7546D8] hover:text-[#6337C3]"
                      >
                        Retry loading events
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}