"use client";

import { useState } from "react";
import { config } from "@/lib/config";
import { authStorage, type AuthSession } from "@/lib/auth/auth-storage";

interface GoogleLoginButtonProps {
  label?: string;
}

export function GoogleLoginButton({
  label = "Continue with Google",
}: GoogleLoginButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleLogin() {
    setError(null);
    setLoading(true);

    const popup = window.open(
      `${config.apiBaseUrl}${config.auth.googleStart}?popup=true`,
      "qlens-google-login",
      "width=500,height=650,left=200,top=100",
    );

    if (!popup) {
      setLoading(false);
      setError("Please allow popups to sign in with Google.");
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (
            event.origin !== new URL(config.apiBaseUrl).origin ||
            event.source !== popup
      ) {
            return;
      }

      if (event.data?.type === "QLENS_AUTH_ERROR") {
        cleanup();
        setLoading(false);
        setError(
            event.data.payload?.message ?? "Google sign in failed."
        );
        return;
      }

      if (event.data?.type !== "QLENS_AUTH_SUCCESS") return;

      const payload = event.data.payload as AuthSession;

      if (
        !payload?.access_token ||
        !payload?.refresh_token ||
        !payload?.account
      ) {
        cleanup();
        setLoading(false);
        setError("Invalid authentication response.");
        return;
      }

      authStorage.save(payload);
      cleanup();

      window.location.assign("/app");
    };

    const cleanup = () => {
      window.removeEventListener("message", handleMessage);
    };

    window.addEventListener("message", handleMessage);

    const popupCheck = window.setInterval(() => {
      if (popup.closed) {
        window.clearInterval(popupCheck);
        cleanup();
        setLoading(false);
      }
    }, 500);
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#7546D8] px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#6338BD] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Connecting to Google..." : label}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}