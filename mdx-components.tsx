
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-8 scroll-m-20 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-5 mt-14 scroll-m-20 border-b border-border/70 pb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-4 mt-9 scroll-m-20 text-xl font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="mb-3 mt-7 text-lg font-semibold text-foreground">
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p className="mb-6 text-[16px] leading-8 text-muted-foreground">
        {children}
      </p>
    ),

    a: ({ children, href }) => (
      <a
        href={href}
        className="font-medium text-emerald-700 underline decoration-emerald-600/30 underline-offset-4 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        {children}
      </a>
    ),

    ul: ({ children }) => (
      <ul className="mb-7 ml-6 list-disc space-y-3 text-[16px] leading-8 text-muted-foreground marker:text-foreground">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-7 ml-6 list-decimal space-y-3 text-[16px] leading-8 text-muted-foreground marker:font-semibold marker:text-foreground">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="pl-1">{children}</li>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 px-6 py-5 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100 [&>p:last-child]:mb-0">
        {children}
      </blockquote>
    ),

    pre: ({ children }) => (
      <pre className="my-8 overflow-x-auto rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-5 font-mono text-sm leading-7 text-slate-800 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
        {children}
      </pre>
    ),

    code: ({ children, className }) => (
      <code
        className={
          className
            ? `${className} font-mono text-[13px]`
            : "rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground"
        }
      >
        {children}
      </code>
    ),

    hr: () => <hr className="my-12 border-border" />,

    table: ({ children }) => (
      <div className="my-8 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-left text-sm">
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead className="bg-muted">{children}</thead>
    ),

    th: ({ children }) => (
      <th className="border-b border-border px-4 py-3 font-semibold text-foreground">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border-b border-border px-4 py-3 text-muted-foreground">
        {children}
      </td>
    ),

    ...components,
  };
}
