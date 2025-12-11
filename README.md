## MyWheels Frontend Challenge

Simple Next.js app that lists MyWheels cars, filters them, and displays markers on a Mapbox map.

### Prerequisites

- Mapbox token
- Access to the MyWheels PHP API

### Setup

1. Install deps

```bash
npm install
```

2. Add an `.env.local` with:

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_token_here
MYWHEELS_API_URL=api_url_here
MYWHEELS_AUTH_APP_ID=auth_app_id_here
```

3. Run

```bash
npm run dev
```

4. Open http://localhost:3000

### Tests

```bash
npm test
```

### Notes

- Data fetching is typed via `useApi`.
- The Next.js API route proxies requests to avoid exposing the app ID in the client and returns helpful errors when the upstream fails.
