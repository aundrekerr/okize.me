"use client";
import Image from 'next/image';
import "@/app/street-fighter-6/[character]/styles/header.css";

type Props = {
  character: string,
  stats: object[]
}

export default function CharacterMovelist({ character, stats }: Props) {
  const characterBgPath = `/street-fighter-6/character-assets/${character}/background.jpg`;
  const characterPortraitPath = `/street-fighter-6/character-assets/${character}/portrait.png`;
  return (
    <>
      <div className="character-header" style={{backgroundImage: `url(${characterBgPath})`}}>
        <div className="container px-8 mx-auto">
          <div className="flex flex-row items-center">
            <div className="portrait box-corners">
              <Image src={characterPortraitPath} alt="" width={80} height={80} />
            </div>
            <h1 className='ml-4'>{character}</h1>
          </div>

          {/* <div className="stats-display">
            {JSON.stringify(stats)}
          </div> */}
        </div>
      </div>
    </>
  )
}