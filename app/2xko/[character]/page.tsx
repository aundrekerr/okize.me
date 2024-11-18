import Image from 'next/image'

import ReduxProvider from "@/lib/ReduxProvider";
import { Header } from '@/app/components/character/Header'
import { Controls } from '@/app/components/character/Controls'
import { Movelist } from '@/app/components/character/Movelist'
import { Curtain } from '@/app/components/character/Curtain'
import { FeaturedMove } from '@/app/components/character/FeaturedMove'
import Riot2XKOConfig from '@/app/2xko/config'
// import sf6MovesConfig from '@/app/street-fighter-6/moves-config/index';
import styles from '@/app/ui/character/page.module.css'

type Params = Promise<{ character: string }>

export default async function CharacterPage(props: { params: Params }) {
  const loadedParams = await props.params;
  if (!loadedParams) return;
  // The character's slug 
  const character = await loadedParams.character;

  // Their data
  const characterConfig = Riot2XKOConfig() as any;
  const config = characterConfig[character];

  // Their background
  const bgPath = `/games/riot2xko/character-assets/${character}/splash.jpg`;

  // // Get the list of character install files
  // let installs = (await fetch(process.env.BASE_URL + `/api/character?game=SF6&character=${character}`)).json();
  // if (!await installs) return;

  // // Get the list of character stat files
  // let stats = (await fetch(process.env.BASE_URL + `/api/stats?game=SF6&character=${character}`)).json();
  // if (!await stats) return;

  // // Frame timeline map
  // const movesConfig = () => {
  //   const config = sf6MovesConfig as any;
  //   return config()[character];
  // };
  // if (!movesConfig()) return;

  // All characters
  const characters = Object.entries(Riot2XKOConfig())
    .filter(([key, character]) => !(character as { name: string, unreleased?: boolean }).hasOwnProperty("unreleased"))
    .map(([key, character]) => ({ name: (character as { name: string, unreleased?: boolean }).name, slug: key }));

  return (
    <ReduxProvider>
      <main className={styles.characterPage}>
        {/* <div className={styles.headerBg}>
          <Image src={bgPath} width="2304" height="1296" alt="" />
        </div> */}
        <div>
          <Header 
            game='riot2xko' 
            config={config} 
            slug={character} 
            characters={characters}
            stats={[]}
          />
          <div className={`${styles.mainLayout}`}>
            <Curtain />
            <div className="flex flex-col gap-4">
              <Controls character={character} characters={characters} config={config} installs={[]} />
            </div>
          </div>
        </div>
      </main>
    </ReduxProvider>
  )
}