"use client";
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";
import { findGame } from '@/app/utils/gamesConfig'

import styles from '@/app/ui/game/roster.module.css'

interface Props {
  game: string
  characters: { name: string; slug: string }[]
}

export const Roster = ({ game, characters }: Props) => {
  const dispatch = useAppDispatch();
  const handleLinkClick = () => {
    // Reset move and install states
    dispatch(setMoveState(null)); 
    dispatch(setInstallState('base')); 
    // Scroll to top
    window.scrollTo(0, 0);
  }

  const gameSlug = () => {
    const gameObj = findGame(game)
    if (gameObj) return gameObj.slug
    return game;
  }

  const gameId = () => {
    const gameObj = findGame(game)
    if (gameObj) return gameObj.id
    return game;
  }

  return (
    <ul className={styles.roster}>
      {characters.map((char: { name: string, slug: string}, i: number) => 
        <motion.li 
          key={char.slug}
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, delay: 0.015 * i }}
        >
          <Link href={`/${gameSlug()}/${char.slug}`} onClick={() => handleLinkClick()}>
            <div className="portrait box-corners">
              <Image src={`/games/${gameId()}/character-assets/${char.slug}/portrait.png`} alt={char.name} width={80} height={80} />
            </div>
          </Link> 
        </motion.li>
      )}
    </ul>
  )
}