
import Link from "next/link";

const navigation = [
  {
    title: "Getting Started",
    links: [
      { label: "Quickstart", href: "/docs/getting-started/quickstart" },
      { label: "Installation", href: "/docs/getting-started/installation" },
      { label: "API Key Setup", href: "/docs/getting-started/api-key-setup" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Celery Integration", href: "/docs/guides/celery-integration" },
      { label: "Configuration", href: "/docs/guides/configuration" },
      { label: "Monitoring Jobs", href: "/docs/guides/monitoring-jobs" },
      { label: "Understanding Events", href: "/docs/guides/understanding-events" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Troubleshooting", href: "/docs/help/troubleshooting" },
      { label: "FAQ", href: "/docs/help/faq" },
    ],
  },
];

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Documentation header */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-xl font-bold tracking-tight">
            QLens
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              Docs
            </span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to QLens
          </Link>
        </div>
      </header>

      {/* Documentation content */}
      <div className="mx-auto flex max-w-[1440px]">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-border/70 md:block">
          <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-6 py-10">
            <Link
              href="/docs"
              className="mb-8 block text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Documentation Home
            </Link>

            <div className="space-y-9">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {section.title}
                  </h2>

                  <ul className="space-y-1.5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
          <article className="mx-auto max-w-3xl">
            {children}
          </article>
        </main>
      </div>
    </div>
  );
}
