import { NextResponse } from 'next/server';

const API_URL = process.env.MYWHEELS_API_URL;
const AUTH_APP_ID = process.env.MYWHEELS_AUTH_APP_ID;

export async function POST(request: Request) {
  if (!API_URL || !AUTH_APP_ID) {
    return NextResponse.json(
      { error: 'API configuration missing on the server' },
      { status: 500 }
    );
  }

  try {
    const reqBody = await request.json();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Simple-Auth-App-Id': AUTH_APP_ID,
      },
      body: JSON.stringify(reqBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || 'Upstream API error' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected server error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
