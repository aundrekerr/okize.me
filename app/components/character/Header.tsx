"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import { motion } from 'framer-motion';

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";

import { Stats } from '@/app/components/character/Stats'
import { Overview } from '@/app/components/character/Overview'

import headerStyles from '@/app/ui/character/header.module.css'
import displayNameStyles from '@/app/ui/character/display-name.module.css'


interface Props {
  config: any
  game: string
  slug: string
  characters: { name: string, slug: string }[]
  stats: any
}

export const Header = ({ config, game, slug, characters, stats }: Props) => {
  const dispatch = useAppDispatch();
  const portraitPath = `/games/street-fighter-6/character-assets/${slug}/portrait.png`;
  // const characterConfig = config() as any;
  // const name = characterConfig[character].name;

  // const characters = Object.entries(config())
  //   .filter(([key, character]) => !character.hasOwnProperty("unreleased"))
  //   .map(([key, character]) => ({ name: character.name, slug: key }));

  const [showCharSelect, setShowCharSelect] = useState(false);
  const [activeHeaderPanel, setActiveHeaderPanel] = useState('stats');

  return (
    <section className={headerStyles.header}>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
        <div className={displayNameStyles.displayName} onClick={() => {
          setShowCharSelect(true);
          dispatch(setMoveState(null))
          dispatch(setInstallState('base'))
        }}>
          <div className="portrait box-corners">
            <Image src={portraitPath} alt="" width={96} height={96} />
          </div>
          <h1 className='mx-4'>{config.name}</h1>
        </div>

        <div className={headerStyles.statsOverviewWrapper}>
          <a 
            onClick={() => setActiveHeaderPanel('stats')} 
            className={`${activeHeaderPanel === 'stats' ? 'text-white' : 'text-zinc-700'} border-r border-zinc-700`}
          >
            <span>Stats</span>
          </a>

          <div className={headerStyles.panelWrapper}>
            <div className={`
              ${(activeHeaderPanel === 'stats' 
                ? headerStyles.opened : headerStyles.closed)} 
              ${headerStyles.headerPanel}`
            }>
              <div className={`
                styled-scrollbar p-2
                ${activeHeaderPanel === 'stats' 
                  ? 'overflow-auto' : 'overflow-hidden'}
              `}>
                <Stats stats={stats} />
              </div>
            </div>
            <div className={`
              ${(activeHeaderPanel === 'overview' 
                ? headerStyles.opened : headerStyles.closed)} 
              ${headerStyles.headerPanel}`
            }>
              <div className={`
                styled-scrollbar p-2
                ${activeHeaderPanel === 'overview' 
                  ? 'overflow-auto' : 'overflow-hidden'}
              `}>
                <Overview />
              </div>
            </div>
          </div>

          <a 
            onClick={() => setActiveHeaderPanel('overview')} 
            className={`${activeHeaderPanel === 'overview' ? 'text-white' : 'text-zinc-700'} border-l border-zinc-700`}
          >
            <span>Overview</span>
          </a>
        </div>
      </div>

      <Dialog open={showCharSelect} onClose={() => setShowCharSelect(false)} className={headerStyles.characterSelectDialog}>
        <ul className="character-list">
          {characters.map((char: { name: string, slug: string}, i: number) => 
            <motion.li 
              key={char.slug}
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: 0.015 * i }}
            >
              <Link href={`/street-fighter-6/${char.slug}`}>
                <div className="portrait box-corners">
                  <Image src={`/games/street-fighter-6/character-assets/${char.slug}/portrait.png`} alt={char.name} width={80} height={80} />
                </div>
              </Link> 
            </motion.li>
          )}
        </ul>
      </Dialog>
    </section>
  )
}