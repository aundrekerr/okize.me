import { promises, readdirSync } from 'fs';
import { CharacterHeader } from './CharacterHeader';
import { CharacterInfo } from './CharacterInfo';
import movesConfig from '@/app/street-fighter-6/moves-config/index';
import "@/app/styles/character-page.css"

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
  let characterInstalls = (await fetch(process.env.BASE_URL + `/api/character?game=SF6&character=${params.character}`)).json();
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
        installs={await characterInstalls}
        frameTimelineMap={frameTimelineMap()}
      />
    </>
  )
}