import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Re-implement this route to combine and process text from both userSource and developerSource.
  // The original implementation was disabled during the multi-source refactoring.

  return new NextResponse('', {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}