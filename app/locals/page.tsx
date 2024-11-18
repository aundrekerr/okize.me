import { Locals } from "@/app/components/locals"
import testData from '@/app/components/locals/testData.json'

export default async function LocalsPage() {
  // const countryPromise = await fetch(process.env.BASE_URL + `/api/country`);
  // console.log(countryPromise)
  // const countryData = await countryPromise.json();
  // console.log(countryData)
  // const countryData = null
  
  return (
    <Locals 
      data={ testData } 
      geoCountry={ null } 
    />
  )
}