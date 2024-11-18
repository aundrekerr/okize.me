import { Locals } from "@/app/components/locals"
import testData from '@/app/components/locals/testData.json'

export default async function LocalsPage() {
  const countryPromise = await fetch(process.env.BASE_URL + `/api/country`);
  const countryData = await countryPromise.json();
  
  return (
    <Locals 
      data={ testData } 
      geoCountry={ countryData.data || null } 
    />
  )
}