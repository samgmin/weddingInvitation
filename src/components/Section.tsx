import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-10", className)}>
      {(eyebrow || title) && (
        <header className="mb-6 text-center">
          {eyebrow && (
            <p className="text-xs font-medium tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-2 font-[var(--font-serif)] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

