"use client";
import { Fragment } from "react";
import { motion } from 'framer-motion';

import slugify from "@/app/utils/slugify";
import config from "@/app/street-fighter-6/config"
import type { Move }from "./MoveItem";
import MoveItem from "./MoveItem";
import "./styles/movelist.css";

type Props = {
  character: string,
  movelist: Move[],
  activeMove: Move | null,
  setActiveMove: Function,
  activeInstall: string,
}

export default function CharacterMovelist({ character, movelist, activeMove, setActiveMove, activeInstall }: Props) {
  const sf6Config = config() as any;
  const movelistCharacter = sf6Config[character];
  const categories = movelistCharacter["categories"][activeInstall];

  return (
    <div className="character-movelist">
      {/* <h4 className="section-header">Moves</h4>
      <p className="header-subtext">The full list of { character }&apos;s moveset.</p> */}
      <ul>
        {
          categories.map((cat: any, cIndex: number) => {
            if (cIndex + 1 === categories.length) return;
            for (const [key, value] of Object.entries(cat)) {
              return movelist.map((move: Move, mIndex: number) => {
                if ((value as number) === mIndex) return (
                  <Fragment key={cIndex}>
                    <h6 className="category-title">{key}</h6>
                    {
                      movelist.map((m: Move, i: number) => {
                        const nextCat = categories[cIndex + 1];
                        if (!nextCat) return;
                        const nextCatIndex = (Object.values(nextCat)[0] as number); 
                        if (i >= (value as number) && i < nextCatIndex) {
                          return <motion.li 
                            key={`moveItem-${i}`} 
                            id={slugify(m.moveName)}
                            className={m.moveName === activeMove?.moveName ? "selected" : ""}
                            onClick={() => setActiveMove(m)} 
                            initial={{ opacity: 0, translateY: -10 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ duration: 0.3, delay: 0.05 * i }}
                          >
                            <MoveItem move={m} />
                          </motion.li>
                        }
                      })
                    }
                  </Fragment>
                )
              })
            }
          })
        }
      </ul>
    </div>
  )
}