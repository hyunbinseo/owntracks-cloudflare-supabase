import type { Bindings } from './worker';

export const NewSupabaseRequest =
	(env: Bindings) =>
	(options: { body: string; table: 'locations' | 'messages' | 'transitions' | 'waypoints' }) =>
		new Request(new URL(`/rest/v1/${options.table}`, env.SUPABASE_URL), {
			method: 'POST',
			body: options.body,
			headers: {
				'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
				'apiKey': env.SUPABASE_ANON_KEY,
				'Content-Type': 'application/json',
			},
		});

export const timestampToDateString = (timestamp: number, multiply = 1000) =>
	new Date(timestamp * multiply).toISOString();
