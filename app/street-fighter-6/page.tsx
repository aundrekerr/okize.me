"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';

import ReduxProvider from "@/lib/ReduxProvider";

import { Wave } from "@/app/components/home/Wave";
import { Roster } from '@/app/components/game/Roster'
import config from "@/app/street-fighter-6/config"

import styles from '@/app/ui/page/gamePage.module.css'
import pageStyles from '@/app/ui/page/page.module.css'

export default function SF6Page() {
  const characters = Object.entries(config())
    .filter(([key, character]) => !character.hasOwnProperty("unreleased"))
    .map(([key, character]) => ({ name: character.name, slug: key }));

  // const mainCursor = useRef<HTMLDivElement>(null);
  // const secondaryCursor = useRef<HTMLDivElement>(null);
  // const positionRef = useRef({
  //   mouseX: 0,
  //   mouseY: 0,
  //   destinationX: 0,
  //   destinationY: 0,
  //   distanceX: 0,
  //   distanceY: 0,
  //   key: -1,
  // });

  // useEffect(() => {
  //   document.addEventListener("mousemove", (event) => {
  //     const { clientX, clientY } = event;
  //     const mouseX = clientX;
  //     const mouseY = clientY;

  //     // if (!mainCursor.current || !secondaryCursor.current) return;
  //     if (!mainCursor.current) return;

  //     // positionRef.current.mouseX = mouseX - secondaryCursor.current.clientWidth / 2;
  //     // positionRef.current.mouseY = mouseY - secondaryCursor.current.clientHeight / 2;
  //     mainCursor.current.style.transform = `
  //       translate3d(
  //         ${mouseX - mainCursor.current.clientWidth / 2}px, 
  //         ${mouseY - mainCursor.current.clientHeight / 2}px, 
  //         0
  //       )
  //     `;
  //   });
  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   const followMouse = () => {
  //     if (!secondaryCursor.current) return;
  //     positionRef.current.key = requestAnimationFrame(followMouse);
  //     const {
  //       mouseX,
  //       mouseY,
  //       destinationX,
  //       destinationY,
  //       distanceX,
  //       distanceY,
  //     } = positionRef.current;
  //     if (!destinationX || !destinationY) {
  //       positionRef.current.destinationX = mouseX;
  //       positionRef.current.destinationY = mouseY;
  //     } else {
  //       positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
  //       positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
  //       if (
  //         Math.abs(positionRef.current.distanceX) +
  //           Math.abs(positionRef.current.distanceY) <
  //         0.1
  //       ) {
  //         positionRef.current.destinationX = mouseX;
  //         positionRef.current.destinationY = mouseY;
  //       } else {
  //         positionRef.current.destinationX += distanceX;
  //         positionRef.current.destinationY += distanceY;
  //       }
  //     }
  //     secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
  //   };
  //   followMouse();
  // }, []);
  
  return (
    <ReduxProvider>
      <main className={pageStyles.pageContainer}>
        <div className={`${pageStyles.pageFirst} ${styles.gameFirst}`} style={{ backgroundImage: `url('/games/street-fighter-6/cover.jpg')` }}>
          {/* <div className={styles.mainCursor} ref={mainCursor}>
            <Image src="/icons/okz-white.svg" alt="okize.me logo" width="32" height="20" />
          </div> */}
          {/* <div className={styles.secondaryCursor} ref={secondaryCursor}>
            <Image priority src={SF6Mark} alt="" width={16} height={16} />
          </div> */}
          <Roster game="street-fighter-6" characters={characters} />
        </div>
        <div className={`${pageStyles.pageSecond} ${styles.gameSecond}`}>
          <Wave direction="vertical" />
          <div className="w-full block">
            <p>Select a character to view in-depth information about their moves.</p>
            <p>Nearly all moves have a full timeline of each frame, just like SF6&apos;s training mode.<br/>Some will also have a full view of each frame&apos;s hitboxes.</p>
            <p>Frame data and extra notes are sourced from Full Meter&apos;s <Link href="https://fullmeter.com/">Frame Assistant Tool</Link>.</p>
          </div>
        </div>
      </main>
    </ReduxProvider>
        // {/* <div 
        //   className="logo-hover" 
        //   style={{
        //     transform: `
        //       translateX(${mousePosition.x}px) 
        //       translateY(${mousePosition.y}px) 
        //       translateZ(0px)
        //     `
        //   }}
        // >
        //   <Image priority src={SF6Mark} alt="" width={20} height={20} />
        // </div> */}
    // <main className="game-page sf6-page split-page">
    //   <section className="locked-in-place character-list-wrapper">
    //     <div className="logo-hover" style={{transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px) translateZ(0px)`}}>
    //       <Image priority src={SF6Mark} alt="" width={20} height={20} />
    //     </div>
    //     <ul className="character-list">
    //       {characters.map((char, i) => 
    //         <motion.li 
    //           key={char.slug}
    //           initial={{ opacity: 0, translateY: -10 }}
    //           animate={{ opacity: 1, translateY: 0 }}
    //           transition={{ duration: 0.3, delay: 0.05 * i }}
    //         >
    //           <Link href={`/street-fighter-6/${char.slug}`}>
    //             <div className="portrait box-corners">
    //               <Image src={`/games/street-fighter-6/character-assets/${char.slug}/portrait.png`} alt={char.name} width={80} height={80} />
    //             </div>
    //           </Link> 
    //         </motion.li>
    //       )}
    //     </ul>
    //   </section>

    //   <div className="page-content">
    //     <h3 className="section-header">Street Fighter 6</h3>
    //     <p>Select a character to view in-depth information about their moves.</p>
    //     <p>All moves have a full frame timeline displaying specific properties of that move for each of its frames. Some moves will also have a hitbox viewer that changes syncronously with the timeline as well.</p>
    //     <p>Frame data is sourced from Full Meter&apos;s <Link href="https://fullmeter.com/">Frame Assistant Tool</Link>.</p>
    //   </div>
    // </main>
  )
}