import Image from 'next/image'

import ReduxProvider from "@/lib/ReduxProvider";
import { Header } from '@/app/components/character/Header'
import { Controls } from '@/app/components/character/Controls'
import { Movelist } from '@/app/components/character/Movelist'
import { FeaturedMove } from '@/app/components/character/FeaturedMove'
import sf6Config from '@/app/street-fighter-6/config'
import sf6MovesConfig from '@/app/street-fighter-6/moves-config/index';
import styles from '@/app/ui/character/page.module.css'

export default async function CharacterPage({ params }: { params: { character: string } }) {
  if (!params.character) return;
  // The character's slug 
  const character = params.character;

  // Their data
  const characterConfig = sf6Config() as any;
  const config = characterConfig[character];

  // Their background
  const bgPath = `/games/street-fighter-6/character-assets/${character}/background.jpg`;

  // Get the list of character install files
  let installs = (await fetch(process.env.BASE_URL + `/api/character?game=SF6&character=${params.character}`)).json();
  if (!await installs) return;

  // Get the list of character stat files
  let stats = (await fetch(process.env.BASE_URL + `/api/stats?game=SF6&character=${params.character}`)).json();
  if (!await stats) return;

  // Frame timeline map
  const movesConfig = () => {
    const config = sf6MovesConfig as any;
    return config()[params.character];
  };
  if (!movesConfig()) return;

  // All characters
  const characters = Object.entries(sf6Config())
    .filter(([key, character]) => !(character as { name: string, unreleased?: boolean }).hasOwnProperty("unreleased"))
    .map(([key, character]) => ({ name: (character as { name: string, unreleased?: boolean }).name, slug: key }));

  return (
    <ReduxProvider>
      <main className={styles.characterPage}>
        <div className={styles.headerBg}>
          <Image src={bgPath} width="2304" height="1296" alt="" />
        </div>
        <div>
          <Header 
            game='street-fighter-6' 
            config={config} 
            slug={character} 
            characters={characters}
            stats={await stats}
          />
          <div className={`${styles.mainLayout}`}>
            <div className="flex flex-col gap-4">
              <Controls config={config} installs={await installs} />
              <Movelist config={config} installs={await installs} /> 
            </div>
            <FeaturedMove character={params.character} config={config} movesConfig={movesConfig()} />
          </div>
        </div>
      </main>
    </ReduxProvider>
  )
}