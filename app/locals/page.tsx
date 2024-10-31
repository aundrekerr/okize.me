import { Locals } from "@/app/components/locals"
// import { LocalsClient } from "@/app/locals/ClientWrapper"
import testData from '@/app/components/locals/testData.json'

export default async function LocalsPage() {
// export default async function LocalsPage() {
//   const localsPromise = async () => (await fetch(process.env.BASE_URL + `/api/locals`)).json();
//   const locals = await localsPromise();
  
  return (
    // <LocalsClient localsData={locals} />
    <Locals data={testData}/>
    // <div>Nothin&apos; here yet.</div>
  )
}