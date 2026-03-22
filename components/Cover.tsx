"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Cover({
  groomName,
  brideName,
  dateLabel,
  image,
}: {
  groomName: string;
  brideName: string;
  dateLabel: string;
  image: string;
}) {
  return (
    <section className="relative h-[92svh] overflow-hidden rounded-3xl">
      <Image src="https://res.cloudinary.com/dp4u12ke2/image/upload/f_auto,q_auto/IMG_5285_keehje" alt="Wedding cover" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-black/5" />
      <motion.div
        className="absolute inset-x-0 bottom-14 px-6 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <p className="font-[var(--font-serif)] text-4xl">{groomName} & {brideName}</p>
        <p className="mt-3 text-sm tracking-[0.18em]">{dateLabel}</p>
      </motion.div>
    </section>
  );
}
