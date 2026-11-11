"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { authStorage } from "@/lib/auth/auth-storage";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    async function verifySession() {
      try {
        await getCurrentUser();

        if (active) {
          setAuthenticated(true);
        }
      } catch {
        authStorage.clear();
        router.replace("/");
      }
    }

    verifySession();

    return () => {
      active = false;
    };
  }, [router]);

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9FC]">
        <p className="text-sm text-[#777481]">
          Verifying your session...
        </p>
      </div>
    );
  }

  return children;
}