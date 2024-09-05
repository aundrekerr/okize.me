// app/api/characters/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises, readdirSync, readFile } from 'fs';
import type { Move } from "@/app/street-fighter-6/[character]/MoveItem";

export async function GET(request: NextRequest) {
  const game = request.nextUrl.searchParams.get('game')
  const character = request.nextUrl.searchParams.get('character')
  const install = request.nextUrl.searchParams.get('install')
  const move = request.nextUrl.searchParams.get('move')
  if (!game || !character) throw new TypeError(`Missing property - game: ${game}, character: ${character}, install: ${install}, move: ${move}`);

  // File path for the install
  const installPath = process.cwd() + `/app/frame-data/${game}/${character}/${install}.json`;
  try {
    // Get the install data
    const data = await promises.readFile(installPath, 'utf8').then(res => res = JSON.parse(res));
    if (!data) return NextResponse.json({ error: `Error listing character (${character}).` }, { status: 500 });
    // Find the move
    const foundMove = data.find((m: Move) => m.moveName === move)
    if (!foundMove) return NextResponse.json({ error: `Move (${move}) not found.` }, { status: 500 });
    // Return the move
    return NextResponse.json({ foundMove });
  } catch (error) {
    console.error('Error listing move:', error);
    return NextResponse.json({ error: 'Error listing move' }, { status: 500 });
  }
}
