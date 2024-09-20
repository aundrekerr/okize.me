import { Header } from '@/app/components/character/Header'

export default async function CharacterPage({ params }: { params: { character: string } }) {
  if (!params.character) return;

  return (
    <>
      <Header />
      {params.character}
    </>
  )
}