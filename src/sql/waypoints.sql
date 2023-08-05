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
