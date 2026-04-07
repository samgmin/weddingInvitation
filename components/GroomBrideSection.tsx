import Image from "next/image";

export function GroomBrideSection({
  image,
  imageWidth,
  imageHeight,
}: {
  image: string;
  imageWidth: number;
  imageHeight: number;
}) {
  return (
    <div className="w-full">
      {image ? (
        <Image
          src={image}
          alt="신랑·신부"
          width={imageWidth}
          height={imageHeight}
          className="mx-auto block h-auto w-full object-contain"
          sizes="(max-width: 480px) 100vw, 432px"
          priority
        />
      ) : (
        <div className="flex min-h-[200px] items-center justify-center text-xs text-[#877865]">
          Groom & Bride 사진
        </div>
      )}
    </div>
  );
}

