export type GalleryImage = {
  src: string;
  alt: string;
};

export type GallerySnap = {
  id: string;
  label: string;
  photos: GalleryImage[];
};

export type ContactPerson = {
  relation: string;
  name: string;
  phone: string;
};

export type VenueGuideItem = {
  title: string;
  description: string;
};

export type StoryItem = {
  year: string;
  text: string;
  /** 단일 사진 (images가 없을 때만 사용) */
  image?: string;
  imageAlt?: string;
  /** 여러 장 (예: 한 타임라인 행에 2장). 있으면 image보다 우선 */
  images?: GalleryImage[];
};

export type ParentIntroItem = {
  name: string;
  image?: string;
  imageAlt?: string;
};

export type RsvpReminderData = {
  delaySeconds: number;
  title: string;
  messageLines: string[];
  namesLine: string;
  dateLine: string;
  venueLine: string;
  ctaLabel: string;
  dismissForTodayLabel: string;
};

export const weddingData = {
  /** 커버 전체 (`public` 기준) */
  coverGif: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775405583/cover_n3hwsh.jpg",
  heroImage: "/hero.svg",
  groom: { name: "정상민", image: "/hero.svg" },
  bride: { name: "장혜림", image: "/hero.svg" },
  groomParentsLabel: "정기영·최명숙",
  brideParentsLabel: "장완균·김다임",
  date: "2026-05-24T12:30:00+09:00",
  dateLabel: "2026년 5월 24일 일요일",
  timeLabel: "오후 12시 30분",
  venueName: "새마을운동중앙회 돌뜰정원",
  /** 예식장 상세 주소 (도로명/지번 등 한 줄에 모두 적어도 됩니다) */
  address: "경기도 성남시 분당구 새마을로 257",
  addressDetail:
    "새마을운동중앙회 내 돌뜰정원",
  /** 네이버 지도 마커 위치 (네이버 지도에서 좌표 확인 후 수정) */
  mapLat: 37.392979, 
  mapLng: 127.158305,
  /** 카카오 공유 시 썸네일 (반드시 https 절대 URL 권장, 비우면 현재 도메인/hero.svg 사용) */
  shareImageUrl: "",
  shareTitle: "정상민 & 장혜림, 결혼합니다",
  shareDescription: "2026년 5월 24일 (일) 오후 12시 30분 · 새마을운동중앙회 돌뜰정원",
  invitationMessage: [
    "꽃이 피는 계절, 저희 두 사람이",
    "평생을 함께할 첫 걸음을 내딛습니다.",
    "소중한 걸음으로 함께해 주시면",
    "오래도록 따뜻한 마음으로 간직하겠습니다.",
  ],
  simpleWeddingInfo: [
    "2026년 5월 24일 일요일 오후 12시 30분",
    "새마을운동중앙회 돌뜰정원",
    "경기도 성남시 분당구 새마을로 257",
  ],
  /** Groom & Bride 블록 단일 이미지 (`public` 기준 URL) */
  groomBrideImage: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775408928/groombride_ajjlty.jpg",
  groomBrideImageWidth: 2160,
  groomBrideImageHeight: 4560,
  storyItems: [
    {
      year: "2015.03 | 동기의 등장",
      text: "\"안녕?\" 한 마디로 시작된 대학 동기 시절. (이때는 몰랐죠, 평생 볼 줄은...)",
      images: [
        {
          src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775406932/story1_1_oewyhc.jpg",
          alt: "2015.03 (1)",
        },
        { src: "/hero.svg", alt: "2015.03 (2)" },
      ],
    },
    {
      year: "2018.12 | 우정 종료, 연애 시작",
      text: "쿨했던 여사친이 '까다로운 여친'으로 전직하고, 시크했던 남사친이 '대문자 T 남친'으로 각성한 역사적인 날!",
      image: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775406456/story2_txv5pm.jpg",
      imageAlt: "2018.12",
    },
    {
      year: "2019 - 2022 | 레벨 업 구간",
      text: "군대, 코로나, 롱디라는 '3종 세트'를 정면 돌파하며 애틋함을 풀충전했습니다.",
      image: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775406456/story3_xb6xtn.jpg",
      imageAlt: "2019-2022",
    },
    {
      year: "2023 - 2025 | 결혼 시뮬레이션",
      text: "방방곡곡 여행 메이트이자 취미 소울메이트로 지내보니, '이 사람과 살면 참 재밌겠다'는 결론에 도달!",
      images: [
        {
          src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775142136/IMG_5166_wcfgcs.jpg",
          alt: "2023-2025 (1)",
        },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775392295/IMG_5439_q0wdej.jpg", alt: "2023-2025 (2)" },
      ],
    },
    {
      year: "2026.05 | 드디어 결혼합니다!",
      text: "9년 차 장기 연애 끝, 마침내 유부월드 입성!",
      image: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775407414/story5_heybqu.jpg",
      imageAlt: "2026.05",
    },
  ] as StoryItem[],
  parentsIntro: {
    groom: [
      { name: "정기영", image: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775392552/IMG_7046_toc12y.jpg", imageAlt: "신랑 아버지" },
      { name: "최명숙", image: "/hero.svg", imageAlt: "신랑 어머니" },
    ] as ParentIntroItem[],
    bride: [
      { name: "장완균", image: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775392551/IMG_7044_xi8sog.jpg", imageAlt: "신부 아버지" },
      { name: "김다임", image: "/hero.svg", imageAlt: "신부 어머니" },
    ] as ParentIntroItem[],
  },
  gallerySnaps: [
    {
      id: "snap-1",
      label: "스냅 01",
      photos: [
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775408350/studio_cover_gtrotd.png", alt: "snap1 photo1" },
        { src: "/hero.svg", alt: "snap1 photo2" },
        { src: "/hero.svg", alt: "snap1 photo3" },
      ],
    },
    {
      id: "snap-2",
      label: "스냅 02",
      photos: [
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775408331/london_cover_o0mrks.png", alt: "snap2 photo1" },
        { src: "/hero.svg", alt: "snap2 photo2" },
        { src: "/hero.svg", alt: "snap2 photo3" },
      ],
    },
    {
      id: "snap-3",
      label: "스냅 03",
      photos: [
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775408214/sokcho_cover_rxdnrk.png", alt: "snap3 photo1" },
        { src: "/hero.svg", alt: "snap3 photo2" },
        { src: "/hero.svg", alt: "snap3 photo3" },
      ],
    },
    {
      id: "snap-4",
      label: "스냅 04",
      photos: [
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775408337/gyeongju_cover_jmxo59.png", alt: "snap4 photo1" },
        { src: "/hero.svg", alt: "snap4 photo2" },
        { src: "/hero.svg", alt: "snap4 photo3" },
      ],
    },
  ] as GallerySnap[],
  contacts: {
    groom: [
      { relation: "신랑", name: "정상민", phone: "010-0000-0000" },
      { relation: "신랑 아버지", name: "정기영", phone: "010-0000-0001" },
      { relation: "신랑 어머니", name: "최명숙", phone: "010-0000-0002" },
    ] as ContactPerson[],
    bride: [
      { relation: "신부", name: "장혜림", phone: "010-0000-0010" },
      { relation: "신부 아버지", name: "장완균", phone: "010-0000-0011" },
      { relation: "신부 어머니", name: "김다임", phone: "010-0000-0012" },
    ] as ContactPerson[],
  },
  venueGuides: [
    { title: "주차 안내", description: "예식 당일 새마을운동중앙회 내 주차장을 이용하실 수 있습니다." },
    { title: "예식장 위치", description: "본관 내 돌뜰정원으로 오시면 됩니다." },
    {
      title: "화환 안내",
      description:
        "화환은 정중히 사양합니다. 예식 장소 특성상 화환 관리가 어려워 부득이하게 반송될 수 있으니 마음만 감사히 받겠습니다.",
    },
    {
      title: "식사 안내",
      description: "식사는 본식 1부 종료 후 시작되며, 예식 시작 약 30분 이후부터 이용 가능합니다.",
    },
  ] as VenueGuideItem[],
  notice:
    "화환은 정중히 사양합니다.\n예식 장소 특성상 화환 관리가 어려워 부득이하게 반송될 예정입니다\n마음만 감사히 받겠습니다",
  accounts: [
    { role: "신랑", name: "정상민", bank: "국민은행", number: "92562417555" },
    { role: "신부", name: "장혜림", bank: "카카오뱅크", number: "3333-4444-5555" },
    { role: "신랑측 아버지", name: "정기영", bank: "국민은행", number: "702702-01-006349" },
    { role: "신랑측 어머니", name: "최명숙", bank: "신한은행", number: "110-123-456789" },
    { role: "신부측 아버지", name: "장완균", bank: "우리은행", number: "1002-123-456789" },
    { role: "신부측 어머니", name: "김다임", bank: "농협", number: "302-1234-5678-91" },
  ],
  rsvpReminder: {
    delaySeconds: 10,
    title: "참석 여부 전달",
    messageLines: [
      "소중한 시간을 내어 결혼식에",
      "참석해주시는 모든 분들께 감사드립니다.",
      "야외예식으로 정확한 인원체크를 위해",
      "참석 여부를 회신해 주시면",
      "더욱 감사하겠습니다.",
    ],
    namesLine: "신랑 정상민 ❤️ 신부 장혜림",
    dateLine: "2026년 5월 24일 일요일 오후 12시 30분",
    venueLine: "새마을운동중앙회 돌뜰정원",
    ctaLabel: "참석 여부 전달",
    dismissForTodayLabel: "오늘하루 보지않기",
  } satisfies RsvpReminderData,
};
