// app/api/(locals)/country/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Response {
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export async function GET(request: NextRequest) {
  try {
    const data = await fetch('http://ip-api.com/json');
    const ipData = await data.json() as Response;
    if (!ipData.country) throw new Error('No data found.')
    return NextResponse.json({ data: ipData.country }); // Return records as JSON
  } catch (error) {
    console.error('Error fetching country:', error);
    return NextResponse.json({ error: 'Failed to fetch country' }, { status: 500 });
  }
}