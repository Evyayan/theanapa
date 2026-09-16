create table if not exists public.articles (

  id uuid primary key
    default gen_random_uuid(),

  title text not null,

  excerpt text,

  body text not null,

  category text not null
    default 'Latest',

  image_url text,

  status text not null
    default 'draft',

  published_at timestamptz,

  created_at timestamptz
    not null default now()

);


alter table public.articles
enable row level security;


create policy
"Published articles are public"

on public.articles

for select

using (
  status = 'published'
);


create index
if not exists articles_published_idx

on public.articles (
  published_at desc
);


create index
if not exists articles_category_idx

on public.articles (
  category
);
