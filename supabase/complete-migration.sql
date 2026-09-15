-- Execute this once if supabase/schema.sql was already executed before the full migration.

insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do nothing;

create table if not exists public.video_favorites (
  video_id bigint not null references public.videos(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (video_id, user_id)
);

create table if not exists public.product_views (
  product_id bigint not null references public.products(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, user_id)
);

alter table public.product_views enable row level security;

drop policy if exists product_views_read_owner_or_admin on public.product_views;
create policy product_views_read_owner_or_admin on public.product_views
for select to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists product_views_insert_owner on public.product_views;
create policy product_views_insert_owner on public.product_views
for insert to authenticated with check (user_id = auth.uid());

alter table public.video_favorites enable row level security;

create policy video_favorites_owner on public.video_favorites
for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy video_storage_read_public on storage.objects
for select using (bucket_id = 'videos');

create policy video_storage_upload_authenticated on storage.objects
for insert to authenticated with check (bucket_id = 'videos');

create policy video_storage_delete_admin on storage.objects
for delete to authenticated using (bucket_id = 'videos' and public.is_admin());
