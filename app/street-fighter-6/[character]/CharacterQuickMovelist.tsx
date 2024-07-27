"use client";
import slugify from "@/app/utils/slugify";
import type { Move }from "./MoveItem";
import config from "@/app/street-fighter-6/config"
import "./styles/quick-movelist.css"

type Props = {
  character: string,
  movelist: Move[],
  activeMove: Move | null,
  setActiveMove: Function,
  activeInstall: string,
  useCommonNames: boolean,
}

export default function CharacterQuickMovelist({ character, movelist, activeMove, setActiveMove, activeInstall, useCommonNames }: Props) {
  const sf6Config = config() as any;
  const movelistCharacter = sf6Config[character];
  const categories = movelistCharacter["categories"][activeInstall];
    
  const scrollToMove = (e: any) => {
    const move = movelist.find(move => e.target.value === move.moveName)
    if (!move) return;
    setActiveMove(move);
    const moveEl = document.getElementById(slugify(move.moveName));
    if (!moveEl) return;
    moveEl.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="character-quick-movelist">
      <h4 className="section-header">Quick Select</h4>
      {/* <p className="header-subtext">Select a character&apos;s move directly from this list.</p> */}
      <select value={activeMove?.moveName} onChange={(e) => scrollToMove(e)}>
        {
          categories.map((cat: any, cIndex: number) => {
            if (cIndex + 1 === categories.length) return;
            for (const [key, value] of Object.entries(cat)) {
              return movelist.map((move: Move, mIndex: number) => {
                if ((value as number) === mIndex) return (
                  <optgroup key={cIndex} label={key}>
                    {
                      movelist.map((m: Move, i: number) => {
                        const nextCat = categories[cIndex + 1];
                        if (!nextCat) return;
                        const nextCatIndex = (Object.values(nextCat)[0] as number); 
                        if (i >= (value as number) && i < nextCatIndex) {
                          return <option key={i} value={m.moveName}>{(useCommonNames && move.cmnName) ? m.cmnName : m.moveName } {"//"} {m.numCmd}</option>
                        }
                      })
                    }
                  </optgroup>
                )
              })
            }
          })
        }
      </select>
    </div>
  )
}