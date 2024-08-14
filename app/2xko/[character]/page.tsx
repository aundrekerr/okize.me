import { promises, readdirSync } from 'fs';
import { CharacterHeader } from '@/app/2xko/[character]/CharacterHeader';
import { CharacterInfo } from '@/app/2xko/[character]/CharacterInfo';
import "@/app/styles/character-page.css"
// import movesConfig from '@/app/street-fighter-6/moves-config/index';

export default async function CharacterPage({ params }: { params: { character: string } }) {
  if (!params.character) return;

  return (
    <>
      <CharacterHeader
        character={params.character} 
      />
      <CharacterInfo />
    </>
  )
}