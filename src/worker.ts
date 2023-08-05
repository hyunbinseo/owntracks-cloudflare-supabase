import { Hono } from 'hono';
import { insertToSupabase, timestampToDateString } from '.';
import { Location } from './schema/location';
import { Transition } from './schema/transition';
import { Waypoint } from './schema/waypoint';

export type Bindings = {
	BASIC_USER: string;
	BASIC_PASSWORD: string;
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post('/', async (c) => {
	const insert = insertToSupabase(c.env);

	if (new URL(c.req.url).protocol !== 'https:') return new Response(null, { status: 426 });

	const authorization = c.req.header('Authorization');
	if (!authorization) return new Response(null, { status: 401 });

	const credentials = `Basic ${btoa(`${c.env.BASIC_USER}:${c.env.BASIC_PASSWORD}`)}`;
	if (authorization !== credentials) return new Response(null, { status: 403 });

	const posted = await c.req.json();

	if (posted._type === 'location') {
		const location = Location.safeParse(posted);
		if (!location.success) return new Response(null, { status: 400 });

		const { _type, created_at, tst, ...rest } = location.data;

		const insertLocation = await fetch(
			insert({
				table: 'locations',
				body: JSON.stringify({
					...rest,
					created_at: timestampToDateString(created_at),
					tst: timestampToDateString(tst),
				}),
			})
		);

		return new Response(null, { status: insertLocation.status });
	}

	if (posted._type === 'transition') {
		const transition = Transition.safeParse(posted);
		if (!transition.success) return new Response(null, { status: 400 });

		const { _type, tst, wtst, ...rest } = transition.data;

		const insertTransition = await fetch(
			insert({
				table: 'transitions',
				body: JSON.stringify({
					...rest,
					tst: timestampToDateString(tst),
					wtst: timestampToDateString(wtst),
				}),
			})
		);

		return new Response(null, { status: insertTransition.status });
	}

	if (posted._type === 'waypoint') {
		const waypoint = Waypoint.safeParse(posted);
		if (!waypoint.success) return new Response(null, { status: 400 });

		const { _type, tst, ...rest } = waypoint.data;

		const insertWaypoint = await fetch(
			insert({
				table: 'waypoints',
				body: JSON.stringify({
					...rest,
					tst: timestampToDateString(tst),
				}),
			})
		);

		return new Response(null, { status: insertWaypoint.status });
	}

	const insertLog = await fetch(insert({ table: 'logs', body: JSON.stringify({ log: posted }) }));

	return new Response(null, { status: insertLog.status });
});

export default app;
