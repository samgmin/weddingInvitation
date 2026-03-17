import { cn } from "@/lib/utils";

export function ButtonLink({
  href,
  children,
  className,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
}) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors";
  const solid =
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200";
  const outline =
    "border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900";

  return (
    <a
      href={href}
      className={cn(base, variant === "solid" ? solid : outline, className)}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

