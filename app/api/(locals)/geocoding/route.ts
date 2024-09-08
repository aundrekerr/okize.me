// app/api/(locals)/geocoding/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get('address');
  if (!address) return NextResponse.json({ error: 'No address provided' }, { status: 500 });

  try {
    const geocodingPromise = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    const geocodingData = await geocodingPromise.json();

    if (!geocodingData.results) return NextResponse.json({ error: 'Failed to geocoding results' }, { status: 500 });
    const lat = geocodingData.results[0].geometry.lat;
    const lng = geocodingData.results[0].geometry.lng;
    
    return NextResponse.json({ lat, lng }); // Return records as JSON
  } catch (error) {
    console.error('Error fetching locals:', error);
    return NextResponse.json({ error: 'Failed to geocoding results' }, { status: 500 });
  }
}
