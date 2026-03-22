-- RSVP 테이블 전체 재생성 (앱 Server Action 스키마와 동일)
--
-- ⚠️ 기존 public.rsvp 의 모든 행이 삭제됩니다. 임의로 만든 테이블을 지우고 맞추려면 이 스크립트를 실행하세요.
-- Supabase: SQL Editor 에 붙여넣어 Run 한 뒤, 잠시 후 RSVP 폼을 다시 제출해 보세요.

drop table if exists public.rsvp cascade;

create table public.rsvp (
  guest_name text not null,
  phone_last4 text not null,
  guest_side text not null check (guest_side in ('groom', 'bride')),
  attendance text not null check (attendance in ('yes', 'no')),
  plus_one boolean not null default false,
  guest_count integer not null default 0 check (guest_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (guest_name, phone_last4)
);

comment on table public.rsvp is '청첩장 참석 의사 (이름+휴대폰 뒷 4자리 복합 PK, upsert 시 갱신)';

create index rsvp_updated_at_idx on public.rsvp (updated_at desc);

-- Service Role 사용 시 RLS는 우회됩니다. Anon만 쓸 경우 아래 주석 해제 후 정책 조정.
-- alter table public.rsvp enable row level security;

notify pgrst, 'reload schema';
