import { SectionHeading } from "@/components/SectionHeading";
import { SectionShell } from "@/components/SectionShell";
import { NaverMap } from "@/components/NaverMap";

export function Location({
  venueName,
  address,
  addressDetail,
  mapLat,
  mapLng,
}: {
  venueName: string;
  address: string;
  addressDetail?: string;
  mapLat: number;
  mapLng: number;
}) {
  /** Dynamic Map: 브라우저에는 Client ID만 전달. Secret 불필요. */
  const naverClientId =
    process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID?.trim() ||
    process.env.NAVER_MAP_CLIENT_ID?.trim() ||
    "";

  return (
    <SectionShell id="location">
      <SectionHeading title="오시는 길" />
      <p className="mt-4 text-sm font-semibold text-zinc-800">{venueName}</p>
      <p className="text-sm leading-6 text-zinc-600">{address}</p>
      {addressDetail ? (
        <p className="mt-2 text-sm leading-6 text-zinc-600">{addressDetail}</p>
      ) : null}

      <div className="mt-4">
        <NaverMap
          lat={mapLat}
          lng={mapLng}
          clientId={naverClientId}
          searchLabel={`${venueName} ${address}`}
        />
      </div>
    </SectionShell>
  );
}
