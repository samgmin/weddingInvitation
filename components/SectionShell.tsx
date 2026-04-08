"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const shellLayoutClass =
  "-mx-3 w-[calc(100%+1.5rem)] px-10 pb-[4.25rem] pt-[5.25rem] text-center text-[#3d352b]";

const scrollEntrance = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function SectionShell({
  id,
  className,
  style,
  /** true면 셸(배경·패딩)은 바로 보이고, 안쪽 내용만 스크롤 진입 시 페이드·슬라이드 */
  animateChildrenInView = false,
  children,
}: {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  animateChildrenInView?: boolean;
  children: React.ReactNode;
}) {
  const mergedClass = cn(shellLayoutClass, className);

  if (animateChildrenInView) {
    return (
      <section id={id} className={mergedClass} style={style}>
        <motion.div {...scrollEntrance}>{children}</motion.div>
      </section>
    );
  }

  return (
    <motion.section id={id} className={mergedClass} style={style} {...scrollEntrance}>
      {children}
    </motion.section>
  );
}
