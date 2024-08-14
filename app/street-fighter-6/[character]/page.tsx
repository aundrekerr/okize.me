import { promises, readdirSync } from 'fs';
import { CharacterHeader } from './CharacterHeader';
import { CharacterInfo } from './CharacterInfo';
import type { Move }from "./MoveItem";
import movesConfig from '@/app/street-fighter-6/moves-config/index';
import "@/app/styles/character-page.css"

const getCharacterInstallFiles = async (character: string) => {
  if (!character) return [];
  const characterFilePath = process.cwd() + `/app/frame-data/SF6/${character}`;
  try {
    // Filter out the stats file from character installs
    const filtered = await readdirSync(characterFilePath).filter(install => install !== 'stats.json');
    // Reformat to have the character install's name and movelist
    const structured = filtered.map(async (install) => {
      // Fetch the movelist json files
      const data = await promises.readFile(process.cwd() + `/app/frame-data/SF6/${character}/${install}`, 'utf8').then(res => res = JSON.parse(res));
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

const getCharacterStatsFile = async (character: string) => {
  if (!character) return;
  const characterFilePath = process.cwd() + `/app/frame-data/SF6/${character}/stats.json`;
  const data = await promises.readFile(characterFilePath, 'utf8').then(res => res = JSON.parse(res));
  if (!data) return [];
  return data;
}

export default async function CharacterPage({ params }: { params: { character: string } }) {
  if (!params.character) return;
  // Get the list of character state files
  let characterInstalls = await getCharacterInstallFiles(params.character);
  if (!await characterInstalls) return;
  // Get the character's stats file
  let characterStats = await getCharacterStatsFile(params.character);
  if(!await characterStats) return;
  const frameTimelineMap = () => {
    const config = movesConfig as any;
    return config()[params.character];
  };
  if (!frameTimelineMap()) return;

  return (
    <>
      <CharacterHeader
        character={params.character} 
        stats={characterStats}
      />
      <CharacterInfo 
        character={params.character}
        installs={characterInstalls}
        frameTimelineMap={frameTimelineMap()}
      />
    </>
  )
}