import type { Bindings } from './worker';

export const insertToSupabase =
	(env: Bindings) => (options: { body: string; table: 'locations' | 'logs' }) =>
		new Request(new URL(`/rest/v1/${options.table}`, env.SUPABASE_URL), {
			method: 'POST',
			body: options.body,
			headers: {
				'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
				'apiKey': env.SUPABASE_ANON_KEY,
				'Content-Type': 'application/json',
			},
		});
