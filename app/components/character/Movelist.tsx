"use client";
import { useState, Fragment } from 'react';
import { motion } from 'framer-motion';

import { SF6Move } from '@/lib/types/Move';
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";
import slugify from "@/app/utils/slugify";

import { MoveItem } from '@/app/components/character/MoveItem';
import styles from '@/app/ui/character/movelist.module.css'

interface Props {
  config: any
  installs: any
}

export const Movelist = ({ config, installs }: Props) => {
  const dispatch = useAppDispatch();
  const activeMove = useAppSelector((state) => state.move.data);
  const activeInstall = useAppSelector((state) => state.move.install);
  const movelist = installs.find((install: { data: SF6Move[], key: string }) => install.key === activeInstall);
  const categories = config.categories[activeInstall];

  const handleClickMove = (move: SF6Move) => {
    if (!move) return;
    dispatch(setMoveState(move));
  }

  return (
    <section className={styles.movelist}>
      <ul>
        {categories.map((cat: any, cIndex: number) => {
          if (cIndex + 1 === categories.length) return;
          for (const [key, value] of Object.entries(cat)) {
            return (movelist.data).map((move: SF6Move, mIndex: number) => {
              if ((value as number) === mIndex) return (
                <Fragment key={cIndex}>
                  <h6><span>{key}</span></h6>
                  {
                    (movelist.data).map((m: SF6Move, i: number) => {
                      const nextCat = categories[cIndex + 1];
                      if (!nextCat) return;
                      const nextCatIndex = (Object.values(nextCat)[0] as number); 
                      if (i >= (value as number) && i < nextCatIndex) {
                        return <motion.li 
                          key={`moveItem-${i}`} 
                          id={slugify(m.moveName)}
                          className={m.moveName === activeMove?.moveName ? "selected" : ""}
                          initial={{ opacity: 0, translateY: -10 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                          onClick={() => handleClickMove(m)}
                        >
                          <MoveItem move={m} />
                        </motion.li>
                      }
                    })
                  }
                </Fragment>
              )
            })
          }
        })}
      </ul>
    </section>
  )
}