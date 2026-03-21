import Image from "next/image";

const gallery = [
  "https://lh3.googleusercontent.com/WDBL8wZMl6qPO0Pej1M138McCY6CmiyIbTjgc-z3WgO7yhDkok1Dq6qCw_hx_PT2mrjkrl0gLgjZA8YQ4Etlyh_2afC_X5E3jDOo4do=s2400",
  "https://lh3.googleusercontent.com/qqBu0Jysqkp31N1tAVmEmuzrI8qBCJW6ol9c1ZgzMPcbgNVz5sKWfFmJhI10H2u5DJ8rUCJiWJMO5PxCYunh2r7LA3A_QHrKsUEiBI8Vvw=s2400",
  "https://lh3.googleusercontent.com/jTLqgUfqKvirOreVw3iqRjWhmk0Hvumx4XUmgntu1eKPwKD_TUaqGQ0qK-4Hq6LphuOeNpevSqWk2zM2q7pD6hBH4KhH22LUoCee85s=s2400",
  "https://lh3.googleusercontent.com/Rc5wx6sJCinGB_rfEBa4KfJCHC7GLKA72wejpHDtUbVq_vUrmUC_TGArmxnKx4-HMYtsEF0kH8n5Yed1jzeaZFWHf_T6SdKmq-5dvPaY=s2400",
  "https://lh3.googleusercontent.com/18nK59fTqtbWOH-pZti0U7icl0s5296wdLgloLpNROZoP5pQWkvRiI3rGyt4b_-vjPti_UfrY9Q9vmrNtgNC0lQ6mvQA3hzOf0AwJl-U=s2400",
  "https://lh3.googleusercontent.com/LU0-l8_6j8Av0t_AZbv9RMjOrYN951dcgz2he9XTr4u8exijAMLoUE7ttk0Qo7MW5BSS2Pcatua8VKX0oG0TEfLHfK62seEcQOPaOTIayw=s2400",
];

function Block({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <p className="text-center text-[11px] tracking-[0.22em] text-emerald-700/70">
        {title}
      </p>
      {subtitle ? (
        <h2 className="mt-2 text-center font-[var(--font-serif)] text-3xl text-emerald-950">
          {subtitle}
        </h2>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ContactCard({
  side,
  role,
  name,
  phone,
}: {
  side: string;
  role: string;
  name: string;
  phone: string;
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4">
      <p className="text-xs text-emerald-700">{side}</p>
      <p className="mt-1 text-sm text-zinc-500">{role}</p>
      <p className="text-lg font-semibold text-emerald-950">{name}</p>
      <div className="mt-3 flex gap-2">
        <a className="rounded-full bg-emerald-700 px-4 py-2 text-xs text-white" href={`tel:${phone.replaceAll("-", "")}`}>
          전화
        </a>
        <a className="rounded-full border border-emerald-200 px-4 py-2 text-xs text-emerald-900" href={`sms:${phone.replaceAll("-", "")}`}>
          문자
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fbf7] text-zinc-800">
      <div className="mx-auto w-full max-w-[460px] px-5 pb-20 pt-10">
        <header className="text-center">
          <p className="text-sm tracking-[0.2em] text-emerald-700/70">JEONGHOON & YUJIN</p>
          <h1 className="mt-3 font-[var(--font-serif)] text-4xl leading-tight text-emerald-950">
            정훈 ＆ 유진,
            <br />
            결혼합니다!
          </h1>
          <p className="mt-4 text-xs tracking-[0.16em] text-emerald-800/70">
            THIS IS THE NEXT PAGE OF OUR LOVE STORY.
          </p>
        </header>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-emerald-100 bg-white">
          <div className="relative aspect-[4/5]">
            <Image src="/hero.svg" alt="wedding cover" fill priority className="object-cover" />
          </div>
        </div>

        <Block title="INVITATION">
          <div className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-6 text-center">
            <p className="leading-8 text-zinc-700">
              꽃 피는 봄날, 사랑도 함께 피어났습니다.
              <br />
              계절이 바뀌어도 변치 않을 사랑을 약속하며
              <br />
              저희 두 사람이 부부로서의 첫발을 내딛습니다.
              <br />
              푸르른 시작을 따뜻한 축복으로 함께해 주세요.
            </p>
            <p className="text-sm text-zinc-600">김영수 · 박미숙의 아들 정훈</p>
            <p className="text-sm text-zinc-600">이성호 · 최미경의 딸 유진</p>
          </div>
        </Block>

        <Block title="CONTACT" subtitle="연락하기">
          <div className="grid gap-3">
            <ContactCard side="신랑측" role="신랑" name="김정훈" phone="010-1234-5678" />
            <ContactCard side="신랑측" role="혼주" name="박미숙" phone="010-1234-5678" />
            <ContactCard side="신부측" role="신부" name="이유진" phone="010-8765-4321" />
            <ContactCard side="신부측" role="혼주" name="이성호" phone="010-8765-4321" />
          </div>
        </Block>

        <Block title="WEDDING DAY">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center">
            <p className="font-[var(--font-serif)] text-2xl text-emerald-950">2026.09.26 토요일 12:30</p>
            <p className="mt-2 text-zinc-600">노블발렌티 삼성 단독홀</p>
            <a href="#location" className="mt-4 inline-block text-sm font-semibold text-emerald-800 underline underline-offset-4">
              위치 안내 바로가기
            </a>
          </div>
        </Block>

        <Block title="GROOM & BRIDE">
          <div className="grid gap-3">
            <div className="rounded-2xl border border-emerald-100 bg-white p-5">
              <h3 className="font-[var(--font-serif)] text-2xl text-emerald-950">신랑 김정훈</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-700">ENFJ · 취미: 신부 생각하기 · 특기: 신부 웃게 하기</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-5">
              <h3 className="font-[var(--font-serif)] text-2xl text-emerald-950">신부 이유진</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-700">ISTP · 취미: 신랑 놀리기 · 특기: 신랑이랑 놀기</p>
            </div>
          </div>
        </Block>

        <Block title="OUR STORY">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6">
            <ul className="space-y-4">
              {[
                ["2023년 겨울", "영화 같았던 첫 만남"],
                ["2024년 여름", "함께하는 취미, 행복했던 시간"],
                ["2025년 가을", "서로가 서로에게, 두 번의 프로포즈"],
                ["2026년 봄", "우리의 새로운 시작. 잘살자, 우리!"],
              ].map(([y, t]) => (
                <li key={y}>
                  <p className="text-xs text-emerald-700">{y}</p>
                  <p className="mt-1 font-medium text-zinc-800">{t}</p>
                </li>
              ))}
            </ul>
          </div>
        </Block>

        <Block title="GALLERY" subtitle="사진첩">
          <div className="grid grid-cols-2 gap-2">
            {gallery.map((src) => (
              <a key={src} href={src} target="_blank" rel="noreferrer" className="overflow-hidden rounded-xl">
                <img src={src} alt="gallery" className="h-full w-full object-cover" />
              </a>
            ))}
          </div>
        </Block>

        <Block title="D-DAY COUNT">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center">
            <p className="text-sm text-zinc-600">정훈 & 유진의 결혼식까지</p>
            <p className="mt-2 font-[var(--font-serif)] text-4xl text-emerald-950">D-193</p>
          </div>
        </Block>

        <Block title="INFORMATION" subtitle="안내 말씀드립니다">
          <div className="space-y-3 rounded-2xl border border-emerald-100 bg-white p-6 text-sm leading-7 text-zinc-700">
            <p className="font-semibold text-emerald-900">[ 식사 안내 ]</p>
            <p>식사는 3층 연회장에서 진행되며, 낮 12시부터 오후 2시까지 뷔페가 제공됩니다.</p>
            <p className="font-semibold text-emerald-900">[ 주차 안내 ]</p>
            <p>최대 1,500대까지 주차 가능하며 2시간 무료 주차가 제공됩니다.</p>
            <p className="font-semibold text-emerald-900">[ 전세버스 ]</p>
            <p>부산 출발: 오전 8시 부산역 앞 / 서울 출발: 오후 2시 예식장 앞</p>
          </div>
        </Block>

        <Block title="LOCATION" subtitle="오시는 길">
          <div id="location" className="rounded-2xl border border-emerald-100 bg-white p-6">
            <p className="font-semibold text-emerald-950">서울 강남구 봉은사로 637</p>
            <p className="text-sm text-zinc-600">노블발렌티 삼성 단독홀</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <a className="rounded-full border border-emerald-200 px-3 py-2 text-center text-xs" href="https://map.naver.com/" target="_blank" rel="noreferrer">네이버지도</a>
              <a className="rounded-full border border-emerald-200 px-3 py-2 text-center text-xs" href="https://www.tmap.co.kr/" target="_blank" rel="noreferrer">티맵</a>
              <a className="rounded-full border border-emerald-200 px-3 py-2 text-center text-xs" href="https://map.kakao.com/" target="_blank" rel="noreferrer">카카오맵</a>
            </div>
          </div>
        </Block>

        <Block title="ACCOUNT" subtitle="마음 전하실 곳">
          <div className="space-y-3 rounded-2xl border border-emerald-100 bg-white p-6 text-sm">
            <p>신랑 김정훈 · 토스뱅크 1000-123-456789</p>
            <p>혼주 박미숙 · 농협 302-9876-5432-10</p>
            <p>신부 이유진 · 카카오뱅크 3333-123-456789</p>
            <p>혼주 이성호 · 국민 717123-45-678901</p>
          </div>
        </Block>

        <Block title="GUEST BOOK" subtitle="축하 메시지를 남겨주세요">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6">
            <form className="grid gap-2">
              <input className="rounded-lg border border-zinc-200 px-3 py-2 text-sm" placeholder="성함" />
              <input className="rounded-lg border border-zinc-200 px-3 py-2 text-sm" placeholder="관계 (선택)" />
              <input className="rounded-lg border border-zinc-200 px-3 py-2 text-sm" placeholder="비밀번호" type="password" />
              <textarea className="min-h-24 rounded-lg border border-zinc-200 px-3 py-2 text-sm" placeholder="축하 메시지" />
              <button type="button" className="mt-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">축하 메시지 보내기</button>
            </form>
          </div>
        </Block>
      </div>
    </main>
  );
}

