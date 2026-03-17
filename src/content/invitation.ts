export type Person = {
  name: string;
  phone?: string;
};

export type InvitationContent = {
  couple: {
    groom: Person;
    bride: Person;
  };
  title: string;
  dateText: string;
  venue: {
    name: string;
    address: string;
    addressDetail?: string;
    mapLinks?: {
      label: string;
      href: string;
    }[];
  };
  message: string[];
  schedule?: { label: string; value: string }[];
  rsvp?: {
    enabled: boolean;
    note?: string;
    kakaoOpenChatUrl?: string;
  };
  gallery?: {
    enabled: boolean;
    images: { src: string; alt: string }[];
  };
};

export const invitation: InvitationContent = {
  couple: {
    groom: { name: "신랑", phone: "010-0000-0000" },
    bride: { name: "신부", phone: "010-0000-0000" },
  },
  title: "결혼합니다",
  dateText: "2026년 6월 21일 (일) 오후 1시",
  venue: {
    name: "OO웨딩홀",
    address: "서울특별시 OO구 OO로 123",
    addressDetail: "OO빌딩 5층",
    mapLinks: [
      { label: "네이버지도", href: "https://map.naver.com/" },
      { label: "카카오맵", href: "https://map.kakao.com/" },
      { label: "구글지도", href: "https://maps.google.com/" },
    ],
  },
  message: [
    "서로의 손을 잡고 같은 길을 걸어가려 합니다.",
    "소중한 분들을 모시고 기쁨을 나누고자 하오니",
    "부디 오셔서 축복해 주세요.",
  ],
  schedule: [
    { label: "식 일시", value: "2026.06.21 (일) 13:00" },
    { label: "장소", value: "OO웨딩홀 5층" },
  ],
  rsvp: {
    enabled: true,
    note: "참석 여부를 알려주시면 큰 도움이 됩니다.",
    kakaoOpenChatUrl: "",
  },
  gallery: {
    enabled: false,
    images: [
      { src: "/gallery/1.jpg", alt: "사진 1" },
      { src: "/gallery/2.jpg", alt: "사진 2" },
      { src: "/gallery/3.jpg", alt: "사진 3" },
    ],
  },
};

