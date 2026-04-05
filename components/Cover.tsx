import Image from "next/image";

/** 풀스크린 커버 — GIF 등 단일 에셋으로 전체 대체 */
export function Cover({ src, alt }: { src: string; alt?: string }) {
  return (
    <section
      id="cover"
      className="relative -mx-3 h-[100svh] w-[calc(100%+1.5rem)] max-w-none overflow-hidden bg-[#e9e1d2]"
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? "청첩장 커버"}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          unoptimized
        />
      ) : null}
    </section>
  );
}
