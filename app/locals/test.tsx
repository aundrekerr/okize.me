"use client";
import { setCoordState } from "@/lib/features/globeCoordsSlice";
import { useAppDispatch } from "@/lib/store";

export const TestListItem = ({ event }: { event: LocalEvent }) => {
  const dispatch = useAppDispatch();
  
  const getGeocodingCoords = async (address: string) => {
    // const geoPromise = async () => (await fetch(`/api/geocoding?address=${event.venue_address}`)).json();
    // const geoData = await geoPromise();
    // dispatch(setCoordState(geoData))
  }

  return (
    <li onClick={() => getGeocodingCoords(event.venue_address)} className="border-b border-zinc-500 py-4">
      {event.event_name}
      <br/>
      <p>{JSON.stringify(event)}</p>
    </li>
  )
}