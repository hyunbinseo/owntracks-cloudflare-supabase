import { Hono } from 'hono';
import { insertToSupabase } from '.';
import { Location } from './schema/location';

export type Bindings = {
	BASIC_USER: string;
	BASIC_PASSWORD: string;
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post('/', async (c) => {
	const insert = insertToSupabase(c.env);

	if (new URL(c.req.url).protocol !== 'https:')
		return new Response(null, { status: 426 });

	const authorization = c.req.header('Authorization');
	if (!authorization) return new Response(null, { status: 401 });
	if (
		authorization !==
		`Basic ${btoa(`${c.env.BASIC_USER}:${c.env.BASIC_PASSWORD}`)}`
	)
		return new Response(null, { status: 403 });

	const posted = await c.req.json();
	if (posted._type !== 'location') {
		const insertLog = await fetch(
			insert({ table: 'logs', body: JSON.stringify({ log: posted }) })
		);
		return new Response(null, { status: insertLog.status });
	}

	const parsed = Location.safeParse(posted);
	if (!parsed.success) return new Response(null, { status: 400 });

	const { created_at, tst, _type, ...rest } = parsed.data;

	const insertLocation = await fetch(
		insert({
			table: 'locations',
			body: JSON.stringify({
				...rest,
				created_at: new Date(created_at * 1000).toISOString(),
				tst: new Date(tst * 1000).toISOString(),
			}),
		})
	);

	return new Response(null, { status: insertLocation.status });
});

export default app;
