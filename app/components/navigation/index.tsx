"use client";
import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Drawer from '@mui/material/Drawer';

import SF6Mark from "@/public/street-fighter-6/sf6-logo.svg";
import Riot2XKOMark from "@/public/2xko/2xko-logo-white.svg";
import "./navigation.css"

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navItems = [
    {
      path: '/street-fighter-6',
      element: (
        <p className="flex flex-row game">
          <Image className="mr-2" priority src={SF6Mark} alt="" width={18} height={18} />
          <span>SF6</span>
        </p>
      ),
    },
    {
      path: '/2xko',
      element: (
        <p className="flex flex-row game">
          <Image className="mr-2" priority src={Riot2XKOMark} alt="" width={22} height={22} />
          <span>2XKO</span>
        </p>
      )
    },
    {
      path: '/about',
      element: (<p>About</p>)
    }
  ]

  return (
    <>
      <div className="main-navigation-toggle">
        <div className="burger" onClick={toggleDrawer(true)}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
            <path className="line line2" d="M 20,50 H 80" />
            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
          </svg>
        </div>
      </div>
      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        <span onClick={toggleDrawer(false)}>close drawer</span>
        <Link href="/"><p>okz</p></Link>
        
        <ul>
          {navItems.map((item, i) => <motion.li 
            key={i}
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
            onClick={toggleDrawer(false)}
          >
            <Link href={item.path}>{item.element}</Link> 
          </motion.li>)}
        </ul>
      </Drawer>
      {/* <nav className="navigation">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/"><p>okz</p></Link>
            <ul className="flex gap-x-6 text-slate-200">
              <li>
                <Link href="/street-fighter-6">
                  <p className="flex flex-row game">
                    <Image className="mr-2" priority src={SF6Mark} alt="" width={18} height={18} />
                    <span>SF6</span>
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/2xko">
                  <p className="flex flex-row game">
                    <Image className="mr-2" priority src={Riot2XKOMark} alt="" width={22} height={22} />
                    <span>2XKO</span>
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;