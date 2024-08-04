"use client";
import Image from 'next/image';

import config from "@/app/2xko/config"
import "@/app/2xko/[character]/styles/header.css";

type Props = {
  character: string,
}

export const CharacterHeader = ({ character }: Props) => {
  const characterPortraitPath = `/riot2xko/character-assets/${character}/portrait.png`;
  const characterConfig = config() as any;
  const charName = characterConfig[character].name;
  const charTheme = characterConfig[character].theme;
  return (
    <>
      <div className="character-header" style={{backgroundColor: charTheme }}>
        <div className="container px-8 mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="display-container">
            <div className="portrait box-corners">
              <Image src={characterPortraitPath} alt="" width={80} height={80} />
            </div>
            <h1 className='mx-4'>{charName}</h1>
          </div>
        </div>
      </div>
    </>
  )
}