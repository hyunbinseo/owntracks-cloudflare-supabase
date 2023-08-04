## Cloudflare Workers

### Environment Variables

- BASIC_PASSWORD
- BASIC_USER
- SUPABASE_ANON_KEY
- SUPABASE_TABLE
- SUPABASE_URL

## Supabase

```
| Columns    | Type        | Note    |
| ---------- | ----------- | ------- |
| id         | int8        | Primary |
| \_type     | varchar     |         |
| conn       | varchar     |         |
| t          | varchar     |         |
| tid        | varchar     |         |
| topic      | varchar     |         |
| acc        | int2        |         |
| alt        | int2        |         |
| batt       | int2        |         |
| bs         | int2        |         |
| created_at | timestamptz |         |
| lat        | float8      |         |
| lon        | float8      |         |
| m          | int2        |         |
| tst        | timestamptz |         |
| vac        | int2        |         |
| vel        | int2        |         |
```

```
| RLS                   | Value                             |
| --------------------- | --------------------------------- |
| Policy name           | Enable insert for anon users only |
| Allowed operation     | INSERT                            |
| Target roles          | anon                              |
| WITH CHECK expression | true                              |
```

```sql
CREATE POLICY "Enable insert for anon users only" ON "public"."location"
AS PERMISSIVE FOR INSERT
TO anon

WITH CHECK (true)
```
