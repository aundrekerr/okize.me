// app/api/(locals)/locals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // return NextResponse.json({ test: "test" }); // Return records as JSON
    // Fetch all records from the "locals" table
    const locals = await query(`
      SELECT
        l.*,
        ARRAY_AGG(
          DISTINCT JSONB_BUILD_OBJECT('slug', g.slug, 'shorthand', g.shorthand)
        ) AS games,
        (TO_JSONB(s) - 'local_id' - 'id') AS socials
      FROM
        locals l
        JOIN rel_locals_games rlg ON l.id = rlg.local_id
        JOIN (
          SELECT DISTINCT
            id,
            slug,
            shorthand
          FROM
            games
        ) g ON rlg.game_id = g.id
        LEFT JOIN "localSocials" s ON l.id = s.local_id
      GROUP BY
        l.id,
        s.id,
        s.twitter
    `);
    return NextResponse.json(locals); // Return records as JSON
  } catch (error) {
    console.error('Error fetching locals:', error);
    return NextResponse.json({ error: 'Failed to fetch locals' }, { status: 500 });
  }
}