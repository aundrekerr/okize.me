// app/api/(locals)/locals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // return NextResponse.json({ test: "test" }); // Return records as JSON
    // Fetch all records from the "locals" table
    const locals = await query('SELECT * FROM locals');
    console.log('locals data: \n', locals[locals.length -1])
    return NextResponse.json([]); // Return records as JSON
  } catch (error) {
    console.error('Error fetching locals:', error);
    return NextResponse.json({ error: 'Failed to fetch locals' }, { status: 500 });
  }
}
