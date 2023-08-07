Track iOS or Android device's location in a custom database.

## Components

- [OwnTracks]: Opensource application. POSTs location data to a custom HTTP endpoint.
- [Cloudflare Workers]: Receives [OwnTracks]' HTTP requests and INSERTs to [Supabase] DB.
- [Supabase]: Hosted PostgreSQL platform. Provides a RESTful API for CRUD operations.

[OwnTracks]: https://owntracks.org/
[Cloudflare Workers]: https://workers.cloudflare.com/
[Supabase]: https://supabase.com/

## Preparation

Clone this repository. Node.js and npm should be installed.

### Supabase

1. Create a new [Supabase] project and select the project in the [dashboard].
2. Goto `SQL Editor / New query / New blank query` and run all SQL commands in the [sql directory].
3. Goto `Authentication / Configuration / Policies` and click the `Enable RLS` buttons in all tables.
4. Goto `Project / Settings / Project Settings / API` and copy the required environment variables.
5. Enter environment variables in the `./wrangler.toml` file. Replace all example values.

[sql directory]: src/sql
[dashboard]: https://app.supabase.com/projects

```bash
# The environment variables should not be committed.
# This can be achieved using the following command.
git update-index --assume-unchanged wrangler.toml
```

### Cloudflare

1. `npm install`
2. `npx wrangler login`
3. `npm run deploy` - a new worker project will be created if it does not exist.

### OwnTracks

When the device leaves Home, the location mode is changed from `significant` to `move`.

```
Regions
└── Home ← This region is optional. H should be capitalized.
```

The `Host` value can be found in the terminal after deployment.

```
Preferences
├── Connection
│   ├── Mode: HTTP
│   ├── Host: https://{{worker}}.{{username}}.workers.dev
│   └── Identification
│       ├── Username: {{wrangler.toml / vars / BASIC_USER}}
│       ├── Password: {{wrangler.toml / vars / BASIC_PASSWORD}}
│       └── Device ID: {{e.g. phone}}
└── connection
    ├── Remote commands: true
    └── Remote configuration: true
```
