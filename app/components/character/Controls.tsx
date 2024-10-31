"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Drawer } from 'vaul';

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";
import { SF6Move } from '@/lib/types/Move';

import { Roster } from '@/app/components/game/Roster'

import styles from '@/app/ui/character/controls.module.css'
import headerStyles from '@/app/ui/character/header.module.css'
import displayNameStyles from '@/app/ui/character/display-name.module.css'

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
        <Drawer.Root direction='left' open={showCharSelect} onOpenChange={setShowCharSelect}>
          <Drawer.Trigger className='self-start'>
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
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content
              className="left-0 lg:left-2 top-2 bottom-2 fixed z-[60] outline-none w-[310px] lg:w-auto flex"
              style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
            >
              <Drawer.Title />
              <div className={headerStyles.rosterWrapper}>
                <Roster game="street-fighter-6" characters={characters} />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
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