"use client";
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";

import styles from '@/app/ui/character/controls.module.css'
import headerStyles from '@/app/ui/character/header.module.css'
import { SF6Move } from '@/lib/types/Move';

interface Props {
  character: string
  characters: { name: string, slug: string }[]
  config: any
  installs: any
}

export const Controls = ({ character, characters, config, installs }: Props) => {
  const dispatch = useAppDispatch();
  const activeMove = useAppSelector((state) => state.move.data);
  const activeInstall = useAppSelector((state) => state.move.install);
  const movelist = installs.find((install: { data: SF6Move[], key: string }) => install.key === activeInstall);
  const categories = config.categories[activeInstall];
  const controlsRef = useRef<HTMLCanvasElement>(null);
  const [showScrolledSelect, setShowScrolledSelect] = useState(false)
  const [showCharSelect, setShowCharSelect] = useState(false);

  useEffect(() => {
    // Reset move & install states
    dispatch(setMoveState(null));
    dispatch(setInstallState('base'));

    const observer = new IntersectionObserver(([e]) => {
      setShowScrolledSelect(e.intersectionRatio < 1)
    },
    {
      rootMargin: '-74px 0px 0px 0px', 
      threshold: [1]
    });
    
    if (controlsRef.current) observer.observe(controlsRef.current)
  }, []); 


  const onMoveSelect = (e: any) => {
    const move = (movelist.data).find((move: SF6Move) => e.target.value === move.moveName)
    if (!move) return;
    dispatch(setMoveState(move))
  }

  const onInstallSelect = (e: any) => {
    dispatch(setMoveState(null))
    dispatch(setInstallState(e.target.value))
  }

  return (
    <section ref={controlsRef} className={styles.controls}>
      {showScrolledSelect && <div className={`${styles.controlPanel} h-full`}>
        <motion.div 
          className='rounded overflow-hidden cursor-pointer border border-zinc-500 h-full'
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
            setShowCharSelect(true);
            dispatch(setMoveState(null))
            dispatch(setInstallState('base'))
          }}
        >
          <Image 
            src={`/games/street-fighter-6/character-assets/${character}/portrait.png`} 
            alt="" 
            className='scale-110 hover:scale-100 transition-transform aspect-square'
            width={56} 
            height={56}
          />
        </motion.div>
        
        {/* Go rework this into an actual component */}
        <Dialog open={showCharSelect} onClose={() => setShowCharSelect(false)} className={headerStyles.characterSelectDialog}>
          <ul className="character-list">
            {characters.map((char: { name: string, slug: string}, i: number) => 
              <motion.li 
                key={char.slug}
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.3, delay: 0.015 * i }}
              >
                <Link href={`/street-fighter-6/${char.slug}`}>
                  <div className="portrait box-corners">
                    <Image src={`/games/street-fighter-6/character-assets/${char.slug}/portrait.png`} alt={char.name} width={80} height={80} />
                  </div>
                </Link> 
              </motion.li>
            )}
          </ul>
        </Dialog>
      </div>}

      <div className={styles.controlPanel}>
        <span className={styles.controlPanelTitle}>Quick Select</span>
        <select 
          name="quickMoveSelect" 
          id="quickMoveSelect"
          className={styles.selectField}
          value={activeMove?.moveName || ''}
          onChange={(e) => onMoveSelect(e)}
        >
          {categories.map((cat: any, cIndex: number) => {
            if (cIndex + 1 === categories.length) return; // stop at the next category

            for (const [key, value] of Object.entries(cat)) {
              return (movelist.data).map((move: SF6Move, mIndex: number) => {
                if ((value as number) === mIndex) return ( // start a new option group
                  <optgroup key={cIndex} label={key}>
                    {(movelist.data).map((m: SF6Move, i: number) => {
                      const nextCat = categories[cIndex + 1];
                      if (!nextCat) return;
                      const nextCatIndex = (Object.values(nextCat)[0] as number);

                      if (i >= (value as number) && i < nextCatIndex) {
                        return <option key={i} value={m.moveName}>
                          {m.moveName} {'//'} {m.numCmd}
                        </option>
                      }
                    })}
                  </optgroup>
                )
              })
            }

          })}
        </select>
      </div>

      <div className={styles.controlPanel}>
        <span className={styles.controlPanelTitle}>States</span>
        <select 
          name="installSelect" 
          id="installSelect"
          className={styles.selectField}
          value={activeMove?.moveName}
          onChange={(e) => onInstallSelect(e)}
        >
          {installs.map(({ data, key }: { data: any, key: string }) => (
            <option key={key} value={key}>
              {config.installs[key]}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}