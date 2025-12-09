import { NextResponse } from 'next/server';

const API_URL = 'https://php-api.mywheels.dev/api/';

export async function POST(request: Request) {
  const reqBody = await request.json();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Simple-Auth-App-Id':
        '1_4ufl98675y8088ko4k80wow4soo0g8cog8kwsssoo4k4ggc84k',
    },
    body: JSON.stringify(reqBody),
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
