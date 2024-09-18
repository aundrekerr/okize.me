"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useRef, useEffect } from 'react';

import Riot2XKOMark from "@/public/games/riot2xko/2xko-logo-white.svg";
import config from "@/app/2xko/config"
import "@/app/styles/game-page.css"
import "@/app/2xko/riot2xko-page.css"

export default function Riot2XKOPage() {
  const characters = Object.entries(config())
    .filter(([key, character]) => !character.hasOwnProperty("unreleased"))
    .map(([key, character]) => ({ name: character.name, slug: key }));

  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => setMousePosition({ x: ev.clientX, y: ev.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return (
    <main className="game-page riot2xko-page">
      <div className="character-list-wrapper">
        <div className="logo-hover" style={{transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`}}>
          <Image priority src={Riot2XKOMark} alt="" width={20} height={20} />
        </div>
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
      </div>

      <div className="page-content">
        <h3 className="section-header">2XKO</h3>
        <p>Select a character to view in-depth information about their moves.</p>
        <p>This game isn&apos;t even out yet so everything is subject to change.</p>
      </div>
    </main>
  )
}