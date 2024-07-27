"use client";
import Image from 'next/image';
import config from "@/app/street-fighter-6/config"
import "@/app/street-fighter-6/[character]/styles/header.css";

type Props = {
  character: string,
  stats: {name: string, stat: number | string | boolean}[]
}

export const CharacterHeader = ({ character, stats }: Props) => {
  const characterBgPath = `/street-fighter-6/character-assets/${character}/background.jpg`;
  const characterPortraitPath = `/street-fighter-6/character-assets/${character}/portrait.png`;
  const characterConfig = config() as any;
  const charName = characterConfig[character].name

  const health = stats.find((item) => item.name === 'health')
  const fWalk = stats.find((item) => item.name === 'fWalk')
  const bWalk = stats.find((item) => item.name === 'bWalk')
  const fDash = stats.find((item) => item.name === 'fDash')
  const bDash = stats.find((item) => item.name === 'bDash')
  const fDashDist = stats.find((item) => item.name === 'fDashDist')
  const bDashDist = stats.find((item) => item.name === 'bDashDist')

  const statNameMap = (stat: string | undefined) => {
    if (!stat) return;
    if (stat === "health") return "Health"
    if (stat === "fWalk") return "Forward Walk"
    if (stat === "bWalk") return "Backward Walk"
    if (stat === "fDash") return "Forward Dash"
    if (stat === "bDash") return "Backward Dash"
    if (stat === "fDashDist") return "F. Dash Distance"
    if (stat === "bDashDist") return "B. Dash Distance"
    if (stat === "fWalk") return "Forward Walk"
    if (stat === "bWalk") return "Backward Walk"
  }

  return (
    <>
      <div className="character-header" style={{backgroundImage: `url(${characterBgPath})`}}>
        <div className="container px-8 mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="display-container">
            <div className="portrait box-corners">
              <Image src={characterPortraitPath} alt="" width={80} height={80} />
            </div>
            <h1 className='mx-4'>{charName}</h1>
          </div>

          {/* <div className="stats-display">
            <ul>
              <li>
                <span className="name">{ statNameMap(health?.name) }</span>
                <span className='stat'>{ health?.stat }</span>
              </li>
              <li>
                <span className="name">{ statNameMap(fWalk?.name) }</span>
                <span className="stat">{ fWalk?.stat }</span>
              </li>
              <li>
                <span className="name">{ statNameMap(bWalk?.name) }</span>
                <span className="stat">{ bWalk?.stat }</span>
              </li>
              <li>
                <span className="name">{ statNameMap(fDash?.name) }</span>
                <span className="stat">{ fDash?.stat }</span>
              </li>
              <li>
                <span className="name">{ statNameMap(bDash?.name) }</span>
                <span className="stat">{ bDash?.stat }</span>
              </li>
              <li>
                <span className="name">{ statNameMap(fDashDist?.name) }</span>
                <span className="stat">{ fDashDist?.stat }</span>
              </li>
              <li>
                <span className="name">{ statNameMap(bDashDist?.name) }</span>
                <span className="stat">{ bDashDist?.stat }</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  )
}