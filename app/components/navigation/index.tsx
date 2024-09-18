"use client";
import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Drawer from '@mui/material/Drawer';

import { Game, allGames } from "@/app/utils/gamesConfig";
import "./navigation.css"

interface IconSizing {
  [key: string]: {
    w: number,
    h: number
  }
}

interface NavItem extends Game {

}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const games = allGames();
  const iconSizing: IconSizing = {
    "street-fighter-6": { w: 34, h: 34 },
    "riot2xko": { w: 44, h: 44 }
  }

  let navItems = [
    { id: 'home', slug: '', title: 'Home', },
    { id: 'about', slug: 'about', title: 'About', },
    { id: 'locals', slug: 'locals', title: 'Locals', },
  ] as NavItem[];
  navItems = [...navItems, ...games];

  return (
    <>
      <div className="main-navigation-toggle">
        <div className="oh">
          {/* <Link onClick={toggleDrawer(false)} href="/"><span>&#1422;</span></Link> */}
          <Link onClick={toggleDrawer(false)} href="/"><span>&#8859;</span></Link>
        </div>
        <div className="burger" onClick={toggleDrawer(true)}>
          <svg className="ham hamRotate180 ham5" viewBox="0 0 100 100">
            <path className="line top" d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429" />
            <path className="line middle" d="m 70,50 h -40" />
            <path className="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429" />
          </svg>
        </div>
      </div>

      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        <nav className="okz-drawer">
          <div className='flex justify-center items-center bg-black text-zinc-50 p-1 cursor-pointer' onClick={toggleDrawer(false)}>
            <span className='text-2xl'>×</span>
          </div>
          <ul className='nav-links'>
            {navItems.map((item, i) => (<li key={item.id}>
              <motion.div
                initial={{ translateY: 'clamp(3rem, 3rem, 4rem)' }}
                animate={{ translateY: 0 }}
                transition={{ ease: [0, 0.55, 0.45, 1], duration: 0.5, delay: 0.125 * (i + 0.5) }}
              >
                <Link onClick={toggleDrawer(false)} href={`/${item.slug}`}>
                  {(item.icon && item.brandFilter) && <Image 
                    className="mr-4" 
                    priority 
                    src={`/games/${item.id}/${item.icon}`} 
                    alt={`${item.title} Logo`} 
                    width={iconSizing[item.id as keyof IconSizing].w} 
                    height={iconSizing[item.id as keyof IconSizing].h} 
                    style={{filter: item?.brandFilter ? item.brandFilter : 'none'}}
                  />}
                  <span data-button={Object.hasOwn(item, 'shorthand') ? item.shorthand : item.title}>
                    {Object.hasOwn(item, 'shorthand') ? item.shorthand : item.title}
                  </span>
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