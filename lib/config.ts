const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
}

if (!frontendUrl) {
  throw new Error("NEXT_PUBLIC_FRONTEND_URL is not configured");
}

export const config = {
  apiBaseUrl: apiBaseUrl.replace(/\/+$/, ""),
  frontendUrl: frontendUrl.replace(/\/+$/, ""),
  auth: {
    googleStart: "/api/v1/auth/google/start",
    refresh: "/api/v1/auth/refresh",
    logout: "/api/v1/auth/logout",
    me: "/api/v1/auth/me",
  },
  apiKeys: {
    workspace: (workspaceId: string) =>
      `/api/v1/workspaces/${workspaceId}/api-keys`,
  },
} as const;
