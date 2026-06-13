import { NextResponse } from 'next/server';

export async function POST(req) {
  const { token } = await req.json();

  if (!token || token.length < 10) {
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: {
      id: 1,
      name: 'SSO User',
      role: 'user'
    }
  });
}
