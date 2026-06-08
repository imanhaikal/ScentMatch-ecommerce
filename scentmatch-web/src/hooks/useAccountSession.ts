"use client";

import { useCallback, useEffect, useState } from "react";
import type { AccountSnapshot } from "@/lib/account/types";

type AccountSessionStatus = "loading" | "authenticated" | "guest" | "error";

interface AccountSessionState {
  account: AccountSnapshot | null;
  status: AccountSessionStatus;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useAccountSession(): AccountSessionState {
  const [account, setAccount] = useState<AccountSnapshot | null>(null);
  const [status, setStatus] = useState<AccountSessionStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/account/me", { credentials: "same-origin" });

      if (response.status === 401) {
        setAccount(null);
        setStatus("guest");
        setError(null);
        return;
      }

      const payload = (await response.json()) as AccountSnapshot & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Unable to load account.");

      setAccount(payload);
      setStatus("authenticated");
      setError(null);
    } catch (sessionError) {
      setAccount(null);
      setStatus("error");
      setError(sessionError instanceof Error ? sessionError.message : "Unable to load account.");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { account, status, error, refresh };
}
