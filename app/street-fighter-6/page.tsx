"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';

import SF6Mark from "@/public/street-fighter-6/sf6-logo.svg";
import config from "@/app/street-fighter-6/config"
import "@/app/street-fighter-6/sf6-page.css"

export default function SF6Page() {
  const characters = Object.entries(config())
    .filter(([key, character]) => !character.hasOwnProperty("unreleased"))
    .map(([key, character]) => ({ name: character.name, slug: key }))
  return (
    <main className="container mx-auto min-h-screen px-4 mt-14 sf6-page">
      <div className="flex flex-col xl:grid grid-cols-2">
        <div className="flex items-start mb-8 justify-center xl:justify-start">
          <Image className="mr-2" priority src={SF6Mark} alt="" width={60} height={60} />
        </div>
        <div className="flex flex-col">
          <h3 className="section-header">Characters</h3>
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
      </div>
    </main>
  )
}