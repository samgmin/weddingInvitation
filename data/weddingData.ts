export type GalleryImage = {
  src: string;
  alt: string;
};

export type GallerySnap = {
  id: string;
  label: string;
  /** 탭(커버) 썸네일용 이미지 */
  cover?: GalleryImage;
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
  /** 커버 이미지 URL (GIF/JPG 등) */
  coverGif: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775576845/cover_2_mxja9x.png",
  /** 실제 파일 픽셀 크기 — 비율·레이아웃용 (파일 바꾸면 같이 수정) */
  coverImageWidth: 908,
  coverImageHeight: 1920,
  groom: { name: "정상민", image: "/hero.svg" },
  bride: { name: "장혜림", image: "/hero.svg" },
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
  shareImageUrl: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775578483/IMG_6672_afqt8j.jpg",
  shareTitle: "정상민 ♥︎ 장혜림",
  shareDescription: "2026년 5월 24일 (일) 오후 12시 30분\n새마을운동중앙회 돌뜰정원",
  invitationMessage: [
    "꽃이 피는 5월, 저희 결혼합니다.",
    "소중한 분들 앞에서 두사람이 서로를 약속하려 합니다.",
    "저희의 가장 좋은 날에 함께해주세요.",
    "오래도록 따뜻한 마음으로 간직하겠습니다.",
  ],
  simpleWeddingInfo: [
    "2026년 5월 24일 일요일 오후 12시 30분",
    "새마을운동중앙회 돌뜰정원",
  ],
  /** Groom & Bride 블록 단일 이미지 (`public` 기준 URL) */
  groomBrideImage: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775408928/groombride_ajjlty.jpg",
  groomBrideImageWidth: 2160,
  groomBrideImageHeight: 4560,
  storyItems: [
    {
      year: "2015.03 | 동기의 등장",
      text: "\"안녕?\" 한 마디로 시작된 \n대학 동기 시절.\n(이때는 몰랐죠, 평생 볼 줄은...)",
      images: [
        {
          src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775406932/story1_1_oewyhc.jpg",
          alt: "2015.03 (1)",
        },
        {
          src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775489535/story1_2_zlkadf.jpg",
          alt: "2015.03 (2)",
        },
      ],
    },
    {
      year: "2017.12 | 우정 종료, 연애 시작",
      text: "쿨했던 여사친이 \n'(알고보니) 까다로운 여친'으로,\n 시크했던 남사친이 \n'(역시나) 대문자 T 남친'으로 각성!",
      image: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775406456/story2_txv5pm.jpg",
      imageAlt: "2018.12",
    },
    {
      year: "2019 - 2022 | 레벨 업 구간",
      text: "군대, 코로나, 롱디 라는 \n'3종 세트'를 정면 돌파하며 \n애틋함을 풀충전",
      image: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775406456/story3_xb6xtn.jpg",
      imageAlt: "2019-2022",
    },
    {
      year: "2023 - 2025 | 결혼 시뮬레이션",
      text: "여행 메이트이자 \n취미 소울메이트로 지내보니, \n'이 사람과 살면 참 재밌겠다'는 \n결론에 도달!",
      images: [
        {
          src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775489541/story4_1_utdlqc.jpg",
          alt: "2023-2025 (1)",
        },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775392295/IMG_5439_q0wdej.jpg", alt: "2023-2025 (2)" },
      ],
    },
    {
      year: "2026.05 | 드디어 결혼합니다!",
      text: "9년 차 장기 연애 끝,\n 마침내 유부월드 입성!",
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
      cover: {
        src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775481658/studio_cover_z9qmro.jpg",
        alt: "studio cover",
      },
      photos: [
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775571129/IMG_7077_pqp2it.jpg", alt: "snap1 photo1" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775575303/SM_2_rbxe2e.jpg", alt: "snap1 photo1-extra" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775571077/IMG_6701_nlbycu.jpg", alt: "snap1 photo1" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775571089/IMG_6706_sqdutf.jpg", alt: "snap1 photo2" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775571045/IMG_6670_ngin8v.jpg", alt: "snap1 photo3" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775575297/SM_1_vgigga.jpg", alt: "snap1 photo8" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775571082/IMG_6703_puqgbe.jpg", alt: "snap1 photo4" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775571060/IMG_6673_qoraz7.jpg", alt: "snap1 photo5" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775571031/IMG_6664_zz6rum.jpg", alt: "snap1 photo6" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775571112/IMG_6825_ou7mih.jpg", alt: "snap1 photo7" },
        
      ],
    },
    {
      id: "snap-2",
      label: "스냅 02",
      cover: {
        src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775481751/london_cover_i6tjmx.jpg",
        alt: "london cover",
      },
      photos: [
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775495549/IMG_8913_deowsq.jpg", alt: "snap2 photo1" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775495589/IMG_8873_nqmsgg.jpg", alt: "snap2 photo2" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775495580/DSCF8572_wc0wcv.jpg", alt: "snap2 photo3" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775495605/DSCF8790_c0uzsm.jpg", alt: "snap2 photo4" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775495594/DSCF8674_orxez7.jpg", alt: "snap2 photo5" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775568768/DSCF8824_k6eakc.jpg", alt: "snap2 photo6" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775495578/IMG_8870_wcn8xf.jpg", alt: "snap2 photo7" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775568772/DSCF8923_stc5bw.jpg", alt: "snap2 photo8" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775495599/IMG_8869_ojhgan.jpg", alt: "snap2 photo9" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775568781/DSCF9153_lagno1.jpg", alt: "snap2 photo10" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775495618/DSCF9161_wvwuku.jpg", alt: "snap2 photo11" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/q_auto/f_auto/v1775568786/DSCF9228_rygo3o.jpg", alt: "snap2 photo12" },
      ],
    },
    {
      id: "snap-3",
      label: "스냅 03",
      cover: {
        src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775481763/sokcho_cover_zi4jge.jpg",
        alt: "sokcho cover",
      },
      photos: [
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775574865/IMG_5530_odr5rg.jpg", alt: "snap3 photo2" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775574870/IMG_5569_zzvdqu.jpg", alt: "snap3 photo1" },
        { src: "/hero.svg", alt: "Comming Soon" },
      ],
    },
    {
      id: "snap-4",
      label: "스냅 04",
      cover: {
        src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775481746/gyeongju_cover_xznufa.jpg",
        alt: "gyeongju cover",
      },
      photos: [
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775494718/IMG_3575_nngsvc.jpg", alt: "snap4 photo1" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775494726/IMG_3567_cqyjkr.jpg", alt: "snap4 photo2" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775494760/IMG_3574_yddtmx.jpg", alt: "snap4 photo3" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775494770/IMG_2645_otss5g.jpg", alt: "snap4 photo4" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775494783/IMG_2644_fljbky.jpg", alt: "snap4 photo5" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775494792/IMG_2646_cptvle.jpg", alt: "snap4 photo6" },
        { src: "https://res.cloudinary.com/dp4u12ke2/image/upload/v1775494751/IMG_3583_znr7mq.jpg", alt: "snap4 photo7" },
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
    {
      title: "화환 안내",
      description:
        "화환은 정중히 사양합니다\n예식 장소 특성상 화환 관리가 어려워 부득이하게 반송될 예정입니다 \n마음만 감사히 받겠습니다",
    },
    { title: "주차 안내", description: "예식 당일 새마을운동중앙회 내 주차장을 이용하실 수 있습니다." },
    {
      title: "식사 안내",
      description: "식사는 본식 1부 종료 후 시작됩니다.",
    },
    {
      title: "ATM 안내",
      description: "예식장 내 ATM이 마련되어 있지 않습니다.",
    },
  ] as VenueGuideItem[],
  notice:
    "화환은 정중히 사양합니다.\n예식 장소 특성상 화환 관리가 어려워 부득이하게 반송될 예정입니다. \n마음만 감사히 받겠습니다",
  accounts: [
    { role: "신랑", name: "정상민", bank: "국민은행", number: "9-2562-4175-55" },
    { role: "신부", name: "장혜림", bank: "우리은행", number: "1002-853-314470" },
    { role: "신랑측 아버지", name: "정기영", bank: "국민은행", number: "702702-01-006349" },
    { role: "신랑측 어머니", name: "최명숙", bank: "농협", number: "394-0202-2758" },
    { role: "신부측 아버지", name: "장완균", bank: "농협", number: "351-0799-8507-63" },
    { role: "신부측 어머니", name: "김다임", bank: "국민은행", number: "276701-04-242385" },
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
