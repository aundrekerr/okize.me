"use client";
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";

import styles from '@/app/ui/character/controls.module.css'
import { SF6Move } from '@/lib/types/Move';

interface Props {
  config: any
  installs: any
}

export const Controls = ({ config, installs }: Props) => {
  const dispatch = useAppDispatch();
  const activeMove = useAppSelector((state) => state.move.data);
  const activeInstall = useAppSelector((state) => state.move.install);
  const movelist = installs.find((install: { data: SF6Move[], key: string }) => install.key === activeInstall);
  const categories = config.categories[activeInstall];

  // Reset states
  useEffect(() => {
    dispatch(setMoveState(null))
    dispatch(setInstallState('base'))
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
    <section className={styles.controls}>
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