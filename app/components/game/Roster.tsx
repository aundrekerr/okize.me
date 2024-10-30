"use client";
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';

import styles from '@/app/ui/game/roster.module.css'

interface Props {
  game: string
  characters: { name: string; slug: string }[]
}

export const Roster = ({ game, characters }: Props) => {
  return (
    <ul className={styles.roster}>
      {characters.map((char: { name: string, slug: string}, i: number) => 
        <motion.li 
          key={char.slug}
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, delay: 0.015 * i }}
        >
          <Link href={`/street-fighter-6/${char.slug}`}>
            <div className="portrait box-corners">
              <Image src={`/games/${game}/character-assets/${char.slug}/portrait.png`} alt={char.name} width={80} height={80} />
            </div>
          </Link> 
        </motion.li>
      )}
    </ul>
  )
}