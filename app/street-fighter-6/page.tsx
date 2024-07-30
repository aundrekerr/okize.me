"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useRef, useEffect } from 'react';

import SF6Mark from "@/public/street-fighter-6/sf6-logo.svg";
import config from "@/app/street-fighter-6/config"
import "@/app/street-fighter-6/sf6-page.css"

export default function SF6Page() {
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
    <main className="sf6-page">
      <div className="character-list-wrapper">
        <div className="logo-hover" style={{transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px) translateZ(0px)`}}>
          <Image priority src={SF6Mark} alt="" width={20} height={20} />
        </div>
        <ul className="character-list">
          {characters.map((char, i) => 
            <motion.li 
              key={char.slug}
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
            >
              <Link href={`/street-fighter-6/${char.slug}`}>
                <div className="portrait box-corners">
                  <Image src={`/street-fighter-6/character-assets/${char.slug}/portrait.png`} alt={char.name} width={80} height={80} />
                </div>
              </Link> 
            </motion.li>
          )}
        </ul>
      </div>

      <div className="other-side">
        other side
      </div>
    </main>
  )
}