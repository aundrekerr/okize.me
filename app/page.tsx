"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';

// import SF6Mark from "@/public/street-fighter-6/sf6-logo.svg";
// import Riot2XKOMark from "@/public/2xko/2xko-logo-white.svg";
import { Phrases } from "@/app/components/home/Phrases";
import { Wave } from "@/app/components/home/Wave";
import { allGames } from "@/app/utils/gamesConfig";
// import "./okz-home.css"

import homeStyles from '@/app/ui/home/home.module.css'
import pageStyles from '@/app/ui/page/page.module.css'

interface iconSizing {
  [key: string]: {
    w: number,
    h: number
  }
}

export default function Home() {
  const games = allGames();
  const iconSizing: iconSizing = {
    "street-fighter-6": { w: 36, h: 36 },
    "riot2xko": { w: 44, h: 44 }
  }

  return (
    <main className={pageStyles.pageContainer}>
      <div className={`${pageStyles.pageFirst} ${homeStyles.flair}`}>
        <Phrases />
      </div>
      <div className={`${pageStyles.pageSecond} ${homeStyles.cta}`}>
        <Wave direction="vertical" />
        <p>Under construction.<br/>Check out what&apos;s around.</p>
        <ul className={homeStyles.gameList}>
          {games.map((game, i) => (<li key={game.id}>
            <motion.div
              initial={{ translateY: 'clamp(3rem, 5rem, 5rem)' }}
              animate={{ translateY: 0 }}
              transition={{ ease: [0, 0.55, 0.45, 1], duration: 1, delay: 0.125 * i }}
            >
              <Link href={`/${game.slug}`}>
                <Image 
                  className="mr-4" 
                  priority 
                  src={`/games/${game.id}/${game.icon}`} 
                  alt={`${game.title} Logo`} 
                  width={iconSizing[game.id as keyof iconSizing].w} 
                  height={iconSizing[game.id as keyof iconSizing].h} 
                  style={{filter: game.brandFilter}}
                />
              </Link>
            </motion.div>
          </li>))}
        </ul>
      </div>
    </main>
  );
}
