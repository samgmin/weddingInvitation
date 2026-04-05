"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionShell({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "px-5 py-6 text-center text-[#3d352b]",
        className,
      )}
    >
      {children}
    </motion.section>
  );
}
