import Image from "next/image";
import { invitation } from "@/content/invitation";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { formatTelHref } from "@/lib/utils";

function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none">
      {children}
    </div>
  );
}

export default function Home() {
  const { couple, venue } = invitation;
  const groomTel = formatTelHref(couple.groom.phone);
  const brideTel = formatTelHref(couple.bride.phone);

  return (
    <div className="min-h-screen bg-[radial-gradient(900px_500px_at_50%_-30%,rgba(244,114,182,0.18),transparent_60%),radial-gradient(900px_500px_at_10%_10%,rgba(59,130,246,0.12),transparent_55%)] dark:bg-[radial-gradient(900px_500px_at_50%_-30%,rgba(244,114,182,0.12),transparent_60%),radial-gradient(900px_500px_at_10%_10%,rgba(59,130,246,0.10),transparent_55%)]">
      <header className="pt-12">
        <Container>
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.22em] text-zinc-600 dark:text-zinc-400">
              WEDDING INVITATION
            </p>
            <h1 className="mt-3 font-[var(--font-serif)] text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {invitation.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                {couple.groom.name}
              </span>
              <span className="mx-2 text-zinc-400">·</span>
              <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                {couple.bride.name}
              </span>
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {invitation.dateText}
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-zinc-200 bg-white/70 shadow-sm shadow-zinc-100 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40 dark:shadow-none">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/hero.svg"
                alt="대표 사진"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="p-5 text-center">
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                {invitation.message.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Container>
      </header>

      <main className="pb-16">
        <Container>
          <Section id="info" eyebrow="INFORMATION" title="예식 안내">
            <Card>
              <dl className="grid gap-4">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    일시
                  </dt>
                  <dd className="text-right text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {invitation.dateText}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    장소
                  </dt>
                  <dd className="text-right text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    <span className="block">{venue.name}</span>
                    <span className="mt-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {venue.address}
                      {venue.addressDetail ? ` · ${venue.addressDetail}` : ""}
                    </span>
                  </dd>
                </div>
              </dl>
            </Card>
          </Section>

          {invitation.schedule?.length ? (
            <Section id="schedule" eyebrow="DETAILS" title="상세 정보">
              <Card>
                <ul className="grid gap-3">
                  {invitation.schedule.map((row) => (
                    <li key={row.label} className="flex justify-between gap-4">
                      <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        {row.label}
                      </span>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Section>
          ) : null}

          <Section id="location" eyebrow="LOCATION" title="오시는 길">
            <Card>
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                <span className="block font-semibold text-zinc-950 dark:text-zinc-50">
                  {venue.name}
                </span>
                <span className="block">{venue.address}</span>
                {venue.addressDetail ? (
                  <span className="block">{venue.addressDetail}</span>
                ) : null}
              </p>

              {venue.mapLinks?.length ? (
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {venue.mapLinks.map((l) => (
                    <ButtonLink key={l.label} href={l.href} variant="outline">
                      {l.label}
                    </ButtonLink>
                  ))}
                </div>
              ) : null}
            </Card>
          </Section>

          {invitation.gallery?.enabled ? (
            <Section id="gallery" eyebrow="GALLERY" title="갤러리">
              <div className="grid grid-cols-2 gap-3">
                {invitation.gallery.images.map((img) => (
                  <div
                    key={img.src}
                    className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          <Section id="contact" eyebrow="CONTACT" title="연락하기">
            <Card>
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      신랑
                    </p>
                    <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                      {couple.groom.name}
                    </p>
                  </div>
                  {groomTel ? <ButtonLink href={groomTel}>전화</ButtonLink> : null}
                </div>
                <div className="h-px w-full bg-zinc-100 dark:bg-zinc-900" />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      신부
                    </p>
                    <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                      {couple.bride.name}
                    </p>
                  </div>
                  {brideTel ? <ButtonLink href={brideTel}>전화</ButtonLink> : null}
                </div>
              </div>
            </Card>
          </Section>

          {invitation.rsvp?.enabled ? (
            <Section id="rsvp" eyebrow="RSVP" title="참석 여부">
              <Card>
                <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                  {invitation.rsvp.note ?? "참석 여부를 알려주세요."}
                </p>
                <div className="mt-5 grid gap-2">
                  {invitation.rsvp.kakaoOpenChatUrl ? (
                    <ButtonLink href={invitation.rsvp.kakaoOpenChatUrl}>
                      카카오 오픈채팅으로 전달
                    </ButtonLink>
                  ) : null}
                  <ButtonLink href="#contact" variant="outline">
                    연락처 섹션으로 이동
                  </ButtonLink>
                </div>
              </Card>
            </Section>
          ) : null}

          <footer className="pt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} {couple.groom.name} · {couple.bride.name}
          </footer>
        </Container>
      </main>
    </div>
  );
}

