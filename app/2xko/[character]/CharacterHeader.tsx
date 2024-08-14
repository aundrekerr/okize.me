"use client";
import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import { motion } from 'framer-motion';

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

  const characters = Object.entries(config())
    .filter(([key, character]) => !character.hasOwnProperty("unreleased"))
    .map(([key, character]) => ({ name: character.name, slug: key }));

  const [showCharSelect, setShowCharSelect] = useState(false);
  
  return (
    <>
      <div className="character-header" style={{backgroundColor: charTheme }}>
        <div className="container px-8 mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="character-display-container" onClick={() => setShowCharSelect(true)}>
            <div className="portrait box-corners">
              <Image src={characterPortraitPath} alt="" width={80} height={80} />
            </div>
            <h1 className='mx-4'>{charName}</h1>
          </div>
          <Dialog open={showCharSelect} onClose={() => setShowCharSelect(false)} className='character-select-dialog'>
            <ul className="character-list">
              {characters.map((char, i) => 
                <motion.li 
                  key={char.slug}
                  initial={{ opacity: 0, translateY: -10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                >
                  <Link href={`/2xko/${char.slug}`}>
                    <div className="portrait box-corners">
                      <Image src={`/riot2xko/character-assets/${char.slug}/portrait.png`} alt={char.name} width={80} height={80} />
                    </div>
                  </Link> 
                </motion.li>
              )}
            </ul>
          </Dialog>
        </div>
      </div>
    </>
  )
}