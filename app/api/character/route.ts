// app/api/characters/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises, readdirSync } from 'fs';
import type { Move } from "@/app/street-fighter-6/[character]/MoveItem";

export async function GET(request: NextRequest) {
  const game = request.nextUrl.searchParams.get('game')
  const character = request.nextUrl.searchParams.get('character')
  const characterFilePath = process.cwd() + `/app/frame-data/${game}/${character}`;
  try {
    // Filter out the stats file from character installs
    const filtered = await readdirSync(characterFilePath).filter(install => install !== 'stats.json');
    // Reformat to have the character install's name and movelist
    const structured = filtered.map(async (install) => {
      // Fetch the movelist json files
      const data = await promises.readFile(process.cwd() + `/app/frame-data/${game}/${character}/${install}`, 'utf8').then(res => res = JSON.parse(res));
      return {
        data: data as Move[],
        key: install.replace(/\.[^/.]+$/, ""), // remove file extension
      }
    });
    // Wait for all promises to resolve
    return NextResponse.json(await Promise.all(structured));
  } catch (error) {
    console.error('Error listing character:', error);
    return NextResponse.json({ error: 'Error listing character' }, { status: 500 });
  }
}
