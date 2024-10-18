"use client";
import { useState, Fragment } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";
import slugify from "@/app/utils/slugify";
import moveAdvantageDisplay from "@/app/utils/moveAdvantageDisplay";
import moveCancelsDisplay from "@/app/utils/moveCancelsDisplay";

import { SF6Move } from '@/lib/types/Move';
import { NotationImages } from '@/app/components/character/NotationImages/SF6'
import styles from '@/app/ui/character/movelist.module.css'

interface Props {
  move: SF6Move
}

export const MoveItem = ({ move }: Props) => {

  const isCharge = () => {
    return Object.hasOwn(move, 'chargeDirection') 
      && ["special", "super"].includes(move.moveType) 
      && !["QCF", "QCF", "HCF", "HCB", "DP", "DQCF"].includes(move.moveMotion)
  }

  return (
    <div className={styles.moveItem}>
      <div className={styles.moveNameWrapper}>
        <span className={styles.moveName}>{move.moveName}</span>
        <span className={styles.moveCmd}>{move.numCmd}</span>
        <NotationImages notationString={move.numCmd} isCharge={isCharge()} />
      </div>
      <div className={styles.moveDataWrapper}>
        <div className="startup">
          <span className={styles.stat}>Startup</span>
          <span>{move.startup}</span>
        </div>
        <div className="active">
          <span className={styles.stat}>Active</span>
          <span>{move.active}</span>
        </div>
        <div className="recovery">
          <span className={styles.stat}>Recovery</span>
          <span>{move.recovery}</span>
        </div>
        <div className="on-hit">
          <span className={styles.stat}>On Hit</span>
          <span className={moveAdvantageDisplay('street-fighter-6', move.onHit)}>{move.onHit}</span>
        </div>
        <div className="on-block">
          <span className={styles.stat}>On Block</span>
          <span className={moveAdvantageDisplay('street-fighter-6', move.onBlock)}>{move.onBlock}</span>
        </div>
        <div className="damage">
          <span className={styles.stat}>Damage</span>
          <span>{move.dmg}</span>
        </div>
        {move.xx && <div className={styles.cancels}>
          <span className={styles.stat}>Cancels</span>
          {typeof move?.xx === "string" && <span>{move.xx}</span>}
          {typeof move?.xx !== "string" && <ul>
            {(move.xx).map((c, i) => 
              <li key={i}>
                <Image 
                  src={`/games/street-fighter-6/input-icons/${moveCancelsDisplay('street-fighter-6', c)}`} 
                  className="max-w-auto" 
                  width={20}
                  height={20}
                  alt=""
                />
                {["su1", "su2", "su3"].includes(c) && c.replace("su", "")}
              </li>
            )}
          </ul> 
          }
        </div>}
      </div>
    </div>
  )
}