
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Activity,
  ChevronDown,
  KeyRound,
  LayoutDashboard,
  List,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plug,
  Settings,
  X,
} from "lucide-react";

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof Activity;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Overview",
    href: "/app",
    icon: LayoutDashboard,
  },
  {
    label: "Jobs",
    href: "/app/jobs",
    icon: List,
  },
  {
    label: "Integrations",
    href: "/app/integrations",
    icon: Plug,
  },
  {
    label: "API Keys",
    href: "/app/api-keys",
    icon: KeyRound,
  },
  {
    label: "Settings",
    href: "/app/settings",
    icon: Settings,
  },
];

const pageTitles: Record<string, string> = {
  "/app": "Overview",
  "/app/jobs": "Jobs",
  "/app/integrations": "Integrations",
  "/app/api-keys": "API Keys",
  "/app/settings": "Settings",
};

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle = pageTitles[pathname] ?? "QLens";

  function renderNavigation(items: NavigationItem[]) {
    return items.map((item) => {
      const Icon = item.icon;

      const active =
        pathname === item.href ||
        (item.href !== "/app" && pathname.startsWith(`${item.href}/`));

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          title={collapsed ? item.label : undefined}
          aria-current={active ? "page" : undefined}
          className={`flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-300 ${
            active
              ? "bg-[#F3EFFB] text-[#7546D8]"
              : "text-[#777481] hover:bg-[#F6F5F8] hover:text-[#292532]"
          } ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
        >
          <Icon size={18} strokeWidth={1.8} className="shrink-0" />

          <span className={collapsed ? "lg:hidden" : ""}>
            {item.label}
          </span>
        </Link>
      );
    });
  }

  return (
    <div className="min-h-screen bg-[#FAF9FC]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Mobile navigation overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-[#EBE9EF] bg-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[76px]" : "lg:w-[248px]"}`}
      >
        {/* Brand */}
        <div className="flex h-[68px] items-center justify-between px-5">
          <Link
            href="/app"
            className="flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#7546D8] text-white">
              <Activity size={19} strokeWidth={2.2} />
            </div>

            <span
              className={`text-xl font-semibold tracking-tight text-[#292532] ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              QLens
            </span>
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            aria-label="Close mobile navigation"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-[#777481] hover:bg-[#F6F5F8] lg:hidden"
          >
            <X size={18} />
          </button>

          {/* Desktop collapse button */}
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((value) => !value)}
            className="hidden rounded-lg p-2 text-[#777481] hover:bg-[#F6F5F8] lg:block"
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        {/* Workspace */}
        <div className="px-3 pb-5">
          <div
            className={`flex items-center gap-3 rounded-xl border border-[#EBE9EF] bg-[#FCFBFD] p-3 ${
              collapsed
                ? "lg:justify-center lg:border-transparent lg:bg-transparent lg:px-0"
                : ""
            }`}
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F0EAFB] text-[#7546D8]">
              <Activity size={18} />
            </div>

            <div className={`min-w-0 flex-1 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="truncate text-sm font-semibold text-[#292532]">
                Personal workspace
              </p>
              <p className="text-xs text-[#92909B]">Free workspace</p>
            </div>

            <ChevronDown
              size={16}
              className={`shrink-0 text-[#92909B] ${
                collapsed ? "lg:hidden" : ""
              }`}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-6 overflow-y-auto px-3"
        >
          <div className="space-y-1">
            <p
              className={`px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-[#A09DA8] ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              Workspace
            </p>

            {renderNavigation(navigationItems)}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-[#EBE9EF] p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F0EAFB] text-sm font-semibold text-[#7546D8]">
              Q
            </div>

            <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="text-sm font-medium text-[#292532]">
                Personal account
              </p>
              <p className="text-xs text-[#92909B]">Workspace owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main application */}
      <div
        className={`min-h-screen ${
          collapsed ? "lg:pl-[76px]" : "lg:pl-[248px]"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#EBE9EF] bg-white/95 px-5 backdrop-blur-sm lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-[#777481] hover:bg-[#F6F5F8] lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-lg font-semibold tracking-tight text-[#292532]">
                {pageTitle}
              </h1>
              <p className="hidden text-xs text-[#92909B] sm:block">
                Monitor your background jobs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-[#EBE9EF] px-3 py-2 sm:flex">
              <span className="size-2 rounded-full bg-[#7546D8]" />
              <span className="text-xs font-medium text-[#777481]">
                Personal workspace
              </span>
            </div>

            <div className="flex size-9 items-center justify-center rounded-full border border-[#EBE9EF] bg-white text-sm font-semibold text-[#7546D8]">
              Q
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          id="main-content"
          className="mx-auto w-full max-w-[1600px] p-5 lg:p-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

