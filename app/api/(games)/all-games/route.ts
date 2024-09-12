// app/api/(games)/all-games/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Returns a list of all games.
export async function GET(request: NextRequest) {
  try {
    const games = await query('SELECT * FROM games');
    return NextResponse.json(games); // Return records as JSON
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}