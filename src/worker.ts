import { Hono } from 'hono';
import { NewSupabaseRequest, timestampToDateString } from '.';
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
	const newSupabaseRequest = NewSupabaseRequest(c.env);

	if (new URL(c.req.url).protocol !== 'https:') return new Response(null, { status: 426 });

	const authorization = c.req.header('Authorization');
	if (!authorization) return new Response(null, { status: 401 });

	const credentials = `Basic ${btoa(`${c.env.BASIC_USER}:${c.env.BASIC_PASSWORD}`)}`;
	if (authorization !== credentials) return new Response(null, { status: 403 });

	const json = await c.req.json();

	const supabaseRequest = (() => {
		try {
			if (json._type === 'location') {
				const { _type, created_at, tst, ...rest } = Location.parse(json);
				return newSupabaseRequest({
					table: 'locations',
					body: JSON.stringify({
						...rest,
						created_at: timestampToDateString(created_at),
						tst: timestampToDateString(tst),
					}),
				});
			}

			if (json._type === 'transition') {
				const { _type, tst, wtst, ...rest } = Transition.parse(json);
				return newSupabaseRequest({
					table: 'transitions',
					body: JSON.stringify({
						...rest,
						tst: timestampToDateString(tst),
						wtst: timestampToDateString(wtst),
					}),
				});
			}

			if (json._type === 'waypoint') {
				const { _type, tst, ...rest } = Waypoint.parse(json);
				return newSupabaseRequest({
					table: 'waypoints',
					body: JSON.stringify({
						...rest,
						tst: timestampToDateString(tst),
					}),
				});
			}
		} catch {}

		return newSupabaseRequest({
			table: 'messages',
			body: JSON.stringify({ message: json }),
		});
	})();

	const supabaseResponse = await fetch(supabaseRequest);

	c.status(supabaseResponse.status);
	return c.json([
		{
			_type: 'cmd',
			action: 'setConfiguration',
			configuration: generateConfiguration({ mode: 'significant' }),
		},
	]);
});

export default app;
