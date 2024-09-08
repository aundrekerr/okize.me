"use client";

export const TestListItem = ({ event }: { event: LocalEvent }) => {
  const getGeocodingCoords = async (address: string) => {
    // const geocodingPromise = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    // console.log(await geocodingPromise)

    const geoPromise = async () => (await fetch(`/api/geocoding?address=${event.venue_address}`)).json();
    const geoData = await geoPromise();
    console.log(geoData)
  }

  return (
    <li onClick={() => getGeocodingCoords(event.venue_address)}>
      {event.venue_address}
    </li>
  )
}