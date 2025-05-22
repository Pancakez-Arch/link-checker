// app/api/link-checker/route.ts

import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    // Fetch the URL and extract all links
    const response = await fetch(url);
    const text = await response.text();

    // Extract links using a regex pattern
    const regex = /href="(https?:\/\/[^"]+)"/g;
    let match;
    const links: string[] = [];

    while ((match = regex.exec(text)) !== null) {
      links.push(match[1]);
    }

    // Check each link's status
    const statusResults = await Promise.all(
      links.map(async (link) => {
        try {
          const res = await fetch(link, { method: 'HEAD' });
          return {
            link,
            status: res.ok ? 'OK' : '404 Not Found',
          };
        } catch (error) {
          return {
            link,
            status: 'Error: ' + error.message,
          };
        }
      })
    );

    return NextResponse.json({ statusResults });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch or parse the URL.' });
  }
}
