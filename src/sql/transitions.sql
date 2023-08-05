create table
	public.transitions (
		"id" bigint generated by default as identity,
		"created_at" timestamp with time zone null default now(),
		"acc" double precision not null,
		"event" text not null,
		"tst" timestamp with time zone not null,
		"wtst" timestamp with time zone not null,
		"desc" text null,
		"lat" double precision null,
		"lon" double precision null,
		"rid" text null,
		"t" text null,
		"tid" text null,
		constraint transitions_pkey primary key (id)
	) tablespace pg_default;

CREATE POLICY "Enable insert for anon users only" ON "public"."transitions"
AS PERMISSIVE FOR INSERT
TO anon

WITH CHECK (true)
