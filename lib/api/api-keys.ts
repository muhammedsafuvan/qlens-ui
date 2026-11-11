
import { config } from "@/lib/config";
import { authenticatedFetch } from "@/lib/auth/auth-service";

export interface APIKey {
  id: string;
  workspace_id: string;
  created_by_user_id: string | null;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
}

export interface APIKeyCreated extends Pick<
  APIKey,
  "id" | "workspace_id" | "name" | "key_prefix" | "created_at"
> {
  key: string;
}

interface APIKeyCreatePayload {
  name: string;
}

export async function listApiKeys(
  workspaceId: string,
): Promise<APIKey[]> {
  const response = await authenticatedFetch(
    `${config.apiBaseUrl}${config.apiKeys.workspace(workspaceId)}`,
  );

  if (!response.ok) {
    throw new Error("Unable to load API keys.");
  }

  return response.json() as Promise<APIKey[]>;
}

export async function createApiKey(
  workspaceId: string,
  name: string,
): Promise<APIKeyCreated> {
  const response = await authenticatedFetch(
    `${config.apiBaseUrl}${config.apiKeys.workspace(workspaceId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name } satisfies APIKeyCreatePayload),
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      body?.detail ?? "Unable to create API key.";

    throw new Error(message);
  }

  return response.json() as Promise<APIKeyCreated>;
}

export async function revokeApiKey(
  workspaceId: string,
  keyId: string,
): Promise<APIKey> {
  const response = await authenticatedFetch(
    `${config.apiBaseUrl}${config.apiKeys.workspace(workspaceId)}/${keyId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ revoked: true }),
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      body?.detail ?? "Unable to revoke API key.";

    throw new Error(message);
  }

  return response.json() as Promise<APIKey>;
}
