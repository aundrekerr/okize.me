import { LocalsClient } from "@/app/locals/ClientWrapper"

export default async function LocalsPage() {
  const localsPromise = async () => (await fetch(process.env.BASE_URL + `/api/locals`)).json();
  const locals = await localsPromise();
  
  return (
    <LocalsClient locals={locals} />
  )
}