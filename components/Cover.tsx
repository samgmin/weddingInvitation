import Image from "next/image";

/**
 * 커버: 가로는 카드 너비에 맞추고, 세로는 원본 비율로 자동 (잘림 없음).
 * 높이는 이미지에 맞춰지므로 고정 svh 없음.
 */
export function Cover({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
}) {
  const unoptimized = /\.gif(\?|$)/i.test(src);

  return (
    <section
      id="cover"
      className="relative -mx-3 w-[calc(100%+1.5rem)] max-w-none overflow-x-hidden bg-[#e9e1d2]"
    >
      <Image
        src={src}
        alt={alt ?? "청첩장 커버"}
        width={width}
        height={height}
        className="block h-auto w-full max-w-none"
        sizes="(max-width: 480px) 100vw, 480px"
        priority
        unoptimized={unoptimized}
      />
    </section>
  );
}
