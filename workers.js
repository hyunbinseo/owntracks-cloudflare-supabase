export default {
	/**
	 * @param {Request} request
	 * @param {{
	 * 	BASIC_PASSWORD: string;
	 * 	BASIC_USER: string;
	 * 	SUPABASE_ANON_KEY: string;
	 * 	SUPABASE_TABLE: string
	 * 	SUPABASE_URL: string;
	 * }} env
	 * @returns
	 */
	async fetch(request, env) {
		const { protocol } = new URL(request.url);
		if (protocol !== 'https:') return new Response(null, { status: 426 });

		const authorization = request.headers.get('Authorization');
		if (!authorization) return new Response(null, { status: 401 });
		if (
			authorization !==
			`Basic ${btoa(`${env.BASIC_USER}:${env.BASIC_PASSWORD}`)}`
		)
			return new Response(null, { status: 403 });

		/**
		 * @type {{
		 *	"_type": string;
		 *	"acc": number;
		 *	"alt": number;
		 *	"batt": number;
		 *	"bs": number;
		 *	"conn": string;
		 *	"created_at": number;
		 *	"lat": number;
		 *	"lon": number;
		 *	"m": number;
		 *	"t": string;
		 *	"tid": string;
		 *	"topic": string;
		 *	"tst": number;
		 *	"vac": number;
		 *	"vel": number;
		 * }}
		 */
		const body = await request.json(); // Assumes that the BODY is valid.

		const response = await fetch(
			new URL(`/rest/v1/${env.SUPABASE_TABLE}`, env.SUPABASE_URL),
			{
				method: 'POST',
				body: JSON.stringify({
					...body,
					created_at: new Date(body.created_at * 1000).toISOString(),
					tst: new Date(body.tst * 1000).toISOString(),
				}),
				headers: {
					'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
					'apiKey': env.SUPABASE_ANON_KEY,
					'Content-Type': 'application/json',
				},
			}
		);

		return new Response(null, { status: response.ok ? 200 : 500 });
	},
};
