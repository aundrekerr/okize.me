import { promises, readdirSync } from 'fs';
import { CharacterHeader } from '@/app/2xko/[character]/CharacterHeader';
import { CharacterInfo } from '@/app/2xko/[character]/CharacterInfo';
import type { Move } from "./MoveItem";
import "@/app/styles/character-page.css"
// import movesConfig from '@/app/street-fighter-6/moves-config/index';

const getCharacterInstallFiles = async (character: string) => {
  if (!character) return [];
  const characterFilePath = process.cwd() + `/app/frame-data/Riot2XKO/${character}`;
  try {
    // Filter out the stats file from character installs
    const filtered = await readdirSync(characterFilePath).filter(install => install !== 'stats.json');
    // Reformat to have the character install's name and movelist
    const structured = filtered.map(async (install) => {
      // Fetch the movelist json files
      const data = await promises.readFile(process.cwd() + `/app/frame-data/Riot2XKO/${character}/${install}`, 'utf8').then(res => res = JSON.parse(res));
      return {
        data: data as Move[],
        key: install.replace(/\.[^/.]+$/, ""), // remove file extension
      }
    });
    // Wait for all promises to resolve
    return await Promise.all(structured);
  } catch {
    return [];
  }
}

export default async function CharacterPage({ params }: { params: { character: string } }) {
  if (!params.character) return;
  // Get the list of character state files 
  let characterInstalls = await getCharacterInstallFiles(params.character);

  return (
    <>
      {/* <CharacterHeader
        character={params.character} 
      />
      <CharacterInfo 
        character={params.character}
        installs={characterInstalls}
      /> */}
    </>
  )
}