import { authenticatedFetch } from "@/lib/auth/auth-service";
import { config } from "@/lib/config";

export interface Job {
  task_id: string;
  task_name: string;
  status: string;
  occurred_at: string;
  worker_name: string | null;
  queue_name: string | null;
  attempt: number;
  exception_type: string | null;
  exception_message: string | null;
  exchange: string | null;
  routing_key: string | null;
}

export interface JobEvent {
  event_id: string;
  task_id: string;
  task_name: string;
  event_type: string;
  occurred_at: string;
  worker_name: string | null;
  queue_name: string | null;
  attempt: number;
  exception_type: string | null;
  exception_message: string | null;
  traceback: string | null;
  exchange: string | null;
  routing_key: string | null;
}

export interface JobListResponse {
  items: Job[];
  total: number;
}

export interface JobDetail {
  task_id: string;
  task_name: string;
  status: string;
  events: JobEvent[];
}

async function getErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  const body: unknown = await response.json().catch(() => null);

  if (
    typeof body === "object" &&
    body !== null &&
    "detail" in body &&
    typeof body.detail === "string"
  ) {
    return body.detail;
  }

  return fallback;
}

export async function listJobs(limit = 10): Promise<JobListResponse> {
  const response = await authenticatedFetch(
    `${config.apiBaseUrl}/api/v1/jobs?limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Unable to load jobs."),
    );
  }

  return response.json() as Promise<JobListResponse>;
}

export async function getJobDetails(taskId: string): Promise<JobDetail> {
  const response = await authenticatedFetch(
    `${config.apiBaseUrl}/api/v1/jobs/${encodeURIComponent(taskId)}`,
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(response, "Unable to load job details."),
    );
  }

  return response.json() as Promise<JobDetail>;
}