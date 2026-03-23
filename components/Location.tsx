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
  const mapSearchKeyword = "새마을운동중앙회";
  const encodedKeyword = encodeURIComponent(mapSearchKeyword);
  const encodedAppName = encodeURIComponent("com.my-invitation.web");

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
      <div className="mt-4 grid grid-cols-3 gap-2">
        <a
          href={`nmap://search?query=${encodedKeyword}&appname=${encodedAppName}`}
          className="rounded-xl border border-[#e3dece] bg-white px-3 py-2 text-center text-sm font-medium text-zinc-700"
        >
          네이버지도
        </a>
        <a
          href={`kakaomap://search?q=${encodedKeyword}`}
          className="rounded-xl border border-[#e3dece] bg-white px-3 py-2 text-center text-sm font-medium text-zinc-700"
        >
          카카오맵
        </a>
        <a
          href={`tmap://search?name=${encodedKeyword}`}
          className="rounded-xl border border-[#e3dece] bg-white px-3 py-2 text-center text-sm font-medium text-zinc-700"
        >
          T맵
        </a>
      </div>
      <p className="mt-2 text-center text-xs text-zinc-500">
        모바일에서 탭하면 각 지도 앱에서 "{mapSearchKeyword}" 검색 화면으로 이동합니다.
      </p>
    </SectionShell>
  );
}
