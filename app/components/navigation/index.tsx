"use client";
import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Drawer from '@mui/material/Drawer';

import { allGames } from "@/app/utils/gamesConfig";
import "./navigation.css"

interface iconSizing {
  [key: string]: {
    w: number,
    h: number
  }
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const games = allGames();
  const iconSizing: iconSizing = {
    "street-fighter-6": { w: 34, h: 34 },
    "riot2xko": { w: 44, h: 44 }
  }

  return (
    <>
      <div className="main-navigation-toggle">
        <div className="burger" onClick={toggleDrawer(true)}>
          <svg className="ham hamRotate180 ham5" viewBox="0 0 100 100">
            <path className="line top" d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429" />
            <path className="line middle" d="m 70,50 h -40" />
            <path className="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429" />
          </svg>
        </div>
      </div>

      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        <span onClick={toggleDrawer(false)}>close drawer</span>
        <Link onClick={toggleDrawer(false)} href="/"><p>okz</p></Link>
        
        <nav>
          <ul>
            {games.map((game, i) => (<li key={game.id}>
              <motion.div
                initial={{ translateY: 'clamp(3rem, 3rem, 4rem)' }}
                animate={{ translateY: 0 }}
                transition={{ ease: [0, 0.55, 0.45, 1], duration: 0.25, delay: 0.125 * i }}
              >
                <Link onClick={toggleDrawer(false)} href={`/${game.slug}`}>
                  {/* <Image 
                    className="mr-4" 
                    priority 
                    src={`/${game.id}/${game.icon}`} 
                    alt={`${game.title} Logo`} 
                    width={iconSizing[game.id as keyof iconSizing].w} 
                    height={iconSizing[game.id as keyof iconSizing].h} 
                    style={{filter: game.brandFilter}}
                  /> */}
                  <span>{game.title}</span>
                </Link>
              </motion.div>
            </li>))}
          </ul>
        </nav>
      </Drawer>
    </>
  );
};

export default Navbar;