## OwnTracks

```
Regions
└── Home

Preferences
├── Connection
│   ├── Mode: HTTP
│   ├── Host: https://owntracks-cloudflare-supabase.{{username}}.workers.dev
│   └── Identification
│       ├── Username: wrangler.toml / vars / BASIC_USER
│       ├── Password: wrangler.toml / vars / BASIC_PASSWORD
│       └── Device ID: e.g. phone
└── connection
    ├── Remote commands: true
    ├── Remote configuration: true
    └── Autostart: true
```

## Supabase

```sql
-- SQL Editor / New query / New blank query

create table
  public.locations (
    id bigint generated by default as identity,
    bs smallint not null,
    created_at timestamp with time zone not null,
    lat double precision not null,
    lon double precision not null,
    topic text not null,
    tst timestamp with time zone not null,
    acc smallint null,
    alt smallint null,
    batt smallint null,
    BSSID text null,
    cog smallint null,
    conn text null,
    inregions text[] null,
    inrids text[] null,
    m smallint null,
    p double precision null,
    poi text null,
    rad smallint null,
    SSID text null,
    t text null,
    tag text null,
    tid text null,
    vac smallint null,
    vel smallint null,
    constraint locations_pkey primary key (id)
  ) tablespace pg_default;

CREATE POLICY "Enable insert for anon users only" ON "public"."locations"
AS PERMISSIVE FOR INSERT
TO anon

WITH CHECK (true)

--

create table
  public.waypoints (
    id bigint generated by default as identity,
    created_at timestamp with time zone null default now(),
    desc text not null,
    tst timestamp with time zone not null,
    lat double precision null,
    lon double precision null,
    major smallint null,
    minor smallint null,
    rad smallint null,
    rid text null,
    uuid uuid null,
    constraint waypoints_pkey primary key (id)
  ) tablespace pg_default;

CREATE POLICY "Enable insert for anon users only" ON "public"."waypoints"
AS PERMISSIVE FOR INSERT
TO anon

WITH CHECK (true)

--

create table
  public.logs (
    id bigint generated by default as identity,
    created_at timestamp with time zone null default now(),
    log text not null,
    constraint logs_pkey primary key (id)
  ) tablespace pg_default;

CREATE POLICY "Enable insert for anon users only" ON "public"."logs"
AS PERMISSIVE FOR INSERT
TO anon

WITH CHECK (true)
```
