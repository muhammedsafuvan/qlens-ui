
interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#292532]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[#777481]">
          {description}
        </p>
      </div>

      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-[#EBE9EF] bg-white px-6 py-12 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#F3EFFB] text-[#7546D8]">
          <span className="text-lg font-semibold">Q</span>
        </div>

        <h3 className="text-base font-semibold text-[#292532]">
          Coming soon
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-[#777481]">
          {description}
        </p>
      </div>
    </section>
  );
}
