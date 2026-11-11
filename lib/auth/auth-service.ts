
import { config } from "@/lib/config";
import { authStorage, type AuthAccount } from "./auth-storage";

export async function authenticatedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  let accessToken = authStorage.getAccessToken();

  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  let response = await fetch(input, {
    ...init,
    headers,
    cache: init.cache ?? "no-store",
  });

  if (response.status === 401) {
    await refreshSession();

    accessToken = authStorage.getAccessToken();

    if (!accessToken) {
      throw new Error("Session expired");
    }

    headers.set("Authorization", `Bearer ${accessToken}`);

    response = await fetch(input, {
      ...init,
      headers,
      cache: init.cache ?? "no-store",
    });
  }

  return response;
}

export async function getCurrentUser(): Promise<AuthAccount> {
  const response = await authenticatedFetch(
    `${config.apiBaseUrl}${config.auth.me}`,
  );

  if (!response.ok) {
    throw new Error("Unable to retrieve authenticated user");
  }

  const account = (await response.json()) as AuthAccount;

  authStorage.updateAccount(account);

  return account;
}

export async function refreshSession() {
  const refreshToken = authStorage.getRefreshToken();

  if (!refreshToken) {
    authStorage.clear();
    throw new Error("Refresh token unavailable");
  }

  const response = await fetch(
    `${config.apiBaseUrl}${config.auth.refresh}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    authStorage.clear();
    throw new Error("Unable to refresh session");
  }

  const tokens = await response.json();
  const account = authStorage.getAccount();

  if (!account) {
    authStorage.clear();
    throw new Error("Account information unavailable");
  }

  authStorage.save({
    ...tokens,
    account,
  });
}

export async function logout() {
  const refreshToken = authStorage.getRefreshToken();

  try {
    if (refreshToken) {
      await fetch(
        `${config.apiBaseUrl}${config.auth.logout}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: refreshToken,
          }),
          cache: "no-store",
        },
      );
    }
  } finally {
    authStorage.clear();
    window.location.assign("/");
  }
}
