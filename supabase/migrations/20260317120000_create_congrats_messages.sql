create table if not exists public.congrats_messages (
  id bigserial primary key,
  name text not null check (char_length(name) between 1 and 20),
  message text not null check (char_length(message) between 1 and 300),
  created_at timestamptz not null default now()
);

create index if not exists congrats_messages_created_at_idx
  on public.congrats_messages (created_at desc);

comment on table public.congrats_messages is '청첩장 축하 메시지';

notify pgrst, 'reload schema';

