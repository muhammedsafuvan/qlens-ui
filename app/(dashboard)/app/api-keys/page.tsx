
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  Check,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import { authStorage } from "@/lib/auth/auth-storage";
import {
  createApiKey,
  listApiKeys,
  revokeApiKey,
  type APIKey,
  type APIKeyCreated,
} from "@/lib/api/api-keys";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ApiKeysPage() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [createdKey, setCreatedKey] = useState<APIKeyCreated | null>(null);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const [revokingKeyId, setRevokingKeyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    const account = authStorage.getAccount();

    if (!account?.workspace_id) {
      setPageError("Workspace information is unavailable. Please sign in again.");
      setLoading(false);
      return;
    }

    setWorkspaceId(account.workspace_id);
  }, []);

  const loadApiKeys = useCallback(async () => {
    if (!workspaceId) return;

    setLoading(true);
    setPageError(null);

    try {
      const keys = await listApiKeys(workspaceId);
      setApiKeys(keys);
    } catch (error) {
      setPageError(
        error instanceof Error ? error.message : "Unable to load API keys.",
      );
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    if (workspaceId) {
      void loadApiKeys();
    }
  }, [workspaceId, loadApiKeys]);

  function openCreateDialog() {
    setKeyName("");
    setCreateError(null);
    setCreateDialogOpen(true);
  }

  function closeCreateDialog() {
    if (creating) return;

    setCreateDialogOpen(false);
    setKeyName("");
    setCreateError(null);
  }

  async function handleCreateKey(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!workspaceId) return;

    const name = keyName.trim();

    if (!name) {
      setCreateError("Please enter a name for your API key.");
      return;
    }

    setCreating(true);
    setCreateError(null);

    try {
      const result = await createApiKey(workspaceId, name);

      setCreatedKey(result);
      setTokenVisible(false);
      setCopied(false);
      setCreateDialogOpen(false);
      setKeyName("");
    } catch (error) {
      setCreateError(
        error instanceof Error ? error.message : "Unable to create API key.",
      );
    } finally {
      setCreating(false);
    }
  }

  function closeCreatedKeyDialog() {
    setCreatedKey(null);
    setTokenVisible(false);
    setCopied(false);

    // The plaintext token is no longer available after this point.
    // Reload the list using the metadata-only GET endpoint.
    void loadApiKeys();
  }

  async function handleCopyToken() {
    if (!createdKey?.key) return;

    try {
      await navigator.clipboard.writeText(createdKey.key);
      setCopied(true);
    } catch {
      setActionError("Unable to copy the API key. Please copy it manually.");
    }
  }

  async function handleRevoke(key: APIKey) {
    if (!workspaceId || key.revoked_at) return;

    const confirmed = window.confirm(
      `Revoke "${key.name}"? Applications using this API key will no longer be able to authenticate.`,
    );

    if (!confirmed) return;

    setRevokingKeyId(key.id);
    setActionError(null);

    try {
      await revokeApiKey(workspaceId, key.id);
      await loadApiKeys();
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Unable to revoke API key.",
      );
    } finally {
      setRevokingKeyId(null);
    }
  }

  const activeCount = apiKeys.filter((key) => !key.revoked_at).length;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <KeyRound className="size-5 text-[#7546D8]" />
            <h1 className="text-2xl font-semibold tracking-tight">
              API keys
            </h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Create and manage API keys used by your applications to connect
            with QLens.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateDialog}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#7546D8] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#6338BD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7546D8] focus-visible:ring-offset-2"
        >
          <Plus className="size-4" />
          Create API key
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total API keys</p>
            <KeyRound className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums">
            {loading ? "—" : apiKeys.length}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Active API keys</p>
            <ShieldCheck className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums">
            {loading ? "—" : activeCount}
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col justify-between gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-semibold">Your API keys</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              API keys are scoped to your current workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadApiKeys()}
            disabled={loading || !workspaceId}
            className="inline-flex h-8 items-center justify-center gap-2 self-start rounded-md border border-border px-3 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            <Activity className="size-3.5" />
            Refresh
          </button>
        </div>

        {actionError && (
          <div
            role="alert"
            className="border-b border-border bg-destructive/5 px-5 py-3 text-sm text-destructive"
          >
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading API keys...
          </div>
        ) : pageError ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <p role="alert" className="text-sm text-destructive">
              {pageError}
            </p>
            <button
              type="button"
              onClick={() => void loadApiKeys()}
              className="mt-4 text-sm font-medium text-[#7546D8] hover:underline"
            >
              Try again
            </button>
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#7546D8]/10 text-[#7546D8]">
              <KeyRound className="size-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold">
              No API keys yet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Create an API key to connect your applications and workers
              to QLens.
            </p>
            <button
              type="button"
              onClick={openCreateDialog}
              className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg bg-[#7546D8] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6338BD]"
            >
              <Plus className="size-4" />
              Create your first key
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-xs text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Key prefix</th>
                  <th className="px-5 py-3 font-medium">Created</th>
                  <th className="px-5 py-3 font-medium">Last used</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {apiKeys.map((key) => {
                  const revoked = Boolean(key.revoked_at);

                  return (
                    <tr key={key.id} className="transition-colors hover:bg-muted/20">
                      <td className="whitespace-nowrap px-5 py-4 font-medium">
                        {key.name}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <code className="rounded bg-muted px-2 py-1 text-xs">
                          {key.key_prefix}••••••••
                        </code>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {formatDate(key.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {key.last_used_at
                          ? formatDate(key.last_used_at)
                          : "Never"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            revoked
                              ? "bg-muted text-muted-foreground"
                              : "bg-emerald-500/10 text-emerald-600"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              revoked ? "bg-muted-foreground" : "bg-emerald-500"
                            }`}
                          />
                          {revoked ? "Revoked" : "Active"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        {!revoked && (
                          <button
                            type="button"
                            onClick={() => void handleRevoke(key)}
                            disabled={revokingKeyId === key.id}
                            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                          >
                            {revokingKeyId === key.id ? (
                              <Loader2 className="size-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="size-3.5" />
                            )}
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Create API key dialog */}
      {createDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCreateDialog();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-api-key-title"
            className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="create-api-key-title" className="text-lg font-semibold">
                  Create API key
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Give your API key a name so you can identify it later.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCreateDialog}
                disabled={creating}
                aria-label="Close dialog"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-50"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateKey} className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="api-key-name"
                  className="text-sm font-medium"
                >
                  API key name
                </label>
                <input
                  id="api-key-name"
                  autoFocus
                  required
                  maxLength={120}
                  value={keyName}
                  onChange={(event) => setKeyName(event.target.value)}
                  placeholder="e.g. Production worker"
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-[#7546D8] focus:ring-2 focus:ring-[#7546D8]/20"
                />
                <p className="text-xs text-muted-foreground">
                  Use a name that identifies the application or environment.
                </p>
              </div>

              {createError && (
                <p role="alert" className="text-sm text-destructive">
                  {createError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCreateDialog}
                  disabled={creating}
                  className="h-9 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !keyName.trim()}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#7546D8] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6338BD] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating && <Loader2 className="size-4 animate-spin" />}
                  Create key
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* One-time API key display */}
      {createdKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="created-api-key-title"
            className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-xl"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="size-6" />
            </div>

            <h2
              id="created-api-key-title"
              className="mt-4 text-lg font-semibold"
            >
              API key created
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your key <strong className="text-foreground">{createdKey.name}</strong>{" "}
              is ready. Copy it now and store it somewhere safe. You won't be
              able to see the full key again after closing this dialog.
            </p>

            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium">Your API key</label>

              <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-2">
                <code className="min-w-0 flex-1 break-all px-1 text-xs leading-6">
                  {tokenVisible
                    ? createdKey.key
                    : "•".repeat(Math.min(createdKey.key.length, 40))}
                </code>

                <button
                  type="button"
                  onClick={() => setTokenVisible((visible) => !visible)}
                  aria-label={tokenVisible ? "Hide API key" : "Show API key"}
                  className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {tokenVisible ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => void handleCopyToken()}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#7546D8] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#6338BD]"
                >
                  {copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {actionError && (
                <p role="alert" className="text-xs text-destructive">
                  {actionError}
                </p>
              )}
            </div>

            <div className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="text-xs leading-5 text-muted-foreground">
                <strong className="text-foreground">Important:</strong> QLens
                stores only a hash of this key. Closing this dialog permanently
                removes the plaintext key from this page.
              </p>
            </div>

            <button
              type="button"
              onClick={closeCreatedKeyDialog}
              className="mt-6 h-10 w-full rounded-lg bg-[#7546D8] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6338BD]"
            >
              I've copied my key. Close
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
