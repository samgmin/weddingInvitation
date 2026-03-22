export type TimelineItem = {
  year: string;
  image: string;
  description: string;
};

export type GalleryCategory = "ceremony" | "snap" | "daily";

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

export const weddingData = {
  groom: { name: "정상민", image: "/hero.svg" },
  bride: { name: "장혜림", image: "/hero.svg" },
  date: "2026-05-24T12:30:00+09:00",
  dateLabel: "2026년 5월 24일 일요일",
  timeLabel: "오후 12시 30분",
  venueName: "새마을운동중앙회 돌뜰정원",
  /** 예식장 상세 주소 (도로명/지번 등 한 줄에 모두 적어도 됩니다) */
  address: "경기도 성남시 분당구 새마을로 257",
  addressDetail:
    "새마을운동중앙회 내 돌뜰정원 (네비: 새마을운동중앙회 또는 돌뜰정원)",
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
  parents: {
    groom: [
      { name: "정기영", image: "/hero.svg" },
      { name: "최명숙", image: "/hero.svg" },
    ],
    bride: [
      { name: "장완균", image: "/hero.svg" },
      { name: "김다임", image: "/hero.svg" },
    ],
  },
  timeline: [
    { year: "2021", image: "/hero.svg", description: "첫 만남, 천천히 가까워진 시간" },
    { year: "2022", image: "/hero.svg", description: "함께한 여행, 서로를 더 알게 된 순간" },
    { year: "2024", image: "/hero.svg", description: "프로포즈, 같은 미래를 약속한 날" },
    { year: "2026", image: "/hero.svg", description: "우리의 결혼식, 새로운 시작" },
  ] as TimelineItem[],
  gallery: [
    { src: "/hero.svg", alt: "ceremony 1", category: "ceremony" },
    { src: "/hero.svg", alt: "ceremony 2", category: "ceremony" },
    { src: "/hero.svg", alt: "snap 1", category: "snap" },
    { src: "/hero.svg", alt: "snap 2", category: "snap" },
    { src: "/hero.svg", alt: "daily 1", category: "daily" },
    { src: "/hero.svg", alt: "daily 2", category: "daily" },
  ] as GalleryImage[],
  notice:
    "마음만으로도 충분히 감사드립니다. 축하 화환·화분은 정중히 사양합니다. 너그러운 양해 부탁드립니다.",
  accounts: [
    { role: "신랑", name: "정상민", bank: "토스뱅크", number: "1000-1111-2222" },
    { role: "신부", name: "장혜림", bank: "카카오뱅크", number: "3333-4444-5555" },
    { role: "신랑측 아버지", name: "정기영", bank: "국민은행", number: "888-12-1234-567" },
    { role: "신랑측 어머니", name: "최명숙", bank: "신한은행", number: "110-123-456789" },
    { role: "신부측 아버지", name: "장완균", bank: "우리은행", number: "1002-123-456789" },
    { role: "신부측 어머니", name: "김다임", bank: "농협", number: "302-1234-5678-91" },
  ],
};
