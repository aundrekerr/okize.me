"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image'

import { SF6Move } from '@/lib/types/Move';
import moveAdvantageDisplay from "@/app/utils/moveAdvantageDisplay";
import moveCancelsDisplay from "@/app/utils/moveCancelsDisplay";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";

import styles from '@/app/ui/character/featured-move/move-data.module.css'
import movelistStlyes from '@/app/ui/character/movelist.module.css'

interface Props {
  move: SF6Move
}

export const MoveData = ({ move }: Props) => {
  return (
    <div className={`${styles.moveData} ${movelistStlyes.moveDataWrapper}`}>
      <div className="startup">
        <span className={movelistStlyes.stat}>Startup</span>
        <span>{move.startup}</span>
      </div>
      <div className="active">
        <span className={movelistStlyes.stat}>Active</span>
        <span>{move.active}</span>
      </div>
      <div className="recovery">
        <span className={movelistStlyes.stat}>Recovery</span>
        <span>{move.recovery}</span>
      </div>
      <div className="on-hit">
        <span className={movelistStlyes.stat}>On Hit</span>
        <span className={moveAdvantageDisplay('street-fighter-6', move.onHit)}>{move.onHit}</span>
      </div>
      <div className="on-block">
        <span className={movelistStlyes.stat}>On Block</span>
        <span className={moveAdvantageDisplay('street-fighter-6', move.onBlock)}>{move.onBlock}</span>
      </div>
      <div className="on-punish-counter">
        <span className={movelistStlyes.stat}>On Punish</span>
        <span className={moveAdvantageDisplay('street-fighter-6', move.onPC)}>{move.onPC}</span>
      </div>
      { move.DRoH && <div className="dr-on-hit">
        <span className={movelistStlyes.stat}>
          <Image 
            src="/games/street-fighter-6/input-icons/drive.png" 
            className="max-w-auto" 
            width={20}
            height={20}
            alt=""
          />
          On Hit
        </span>
        <span>{move.DRoH}</span>
      </div>}
      { move.DRoB && <div className="dr-on-block">
        <span className={movelistStlyes.stat}>
          <Image 
            src="/games/street-fighter-6/input-icons/drive.png" 
            className="max-w-auto" 
            width={20}
            height={20}
            alt=""
          />
          On Block
        </span>
        <span>{move.DRoB}</span>
      </div>}
      <div className="damage">
        <span className={movelistStlyes.stat}>Damage</span>
        <span>{move.dmg}</span>
      </div>
      {move.dmgScaling && <div className="damage-scaling">
        <span className={movelistStlyes.stat}>Scaling</span>
        <span>{move.dmgScaling}</span>
      </div>}
      <div className="total">
        <span className={movelistStlyes.stat}>Duration</span>
        <span>{move.total}</span>
      </div>
      {/* <div className="modern">
        <span className={movelistStlyes.stat}>Modern</span>
        <span>{move.ezCmd}</span>
      </div> */}
      <div className="level">
        <span className={movelistStlyes.stat}>Level</span>
        <span>{move.atkLvl}</span>
      </div>
      { move.hitstun && <div className="hitstun">
        <span className={movelistStlyes.stat}>Hitstun</span>
        <span>{move.hitstun}</span>
      </div>}
      { move.blockstun && <div className="blockstun">
        <span className={movelistStlyes.stat}>Blockstun</span>
        <span>{move.blockstun}</span>
      </div>}
      { move.hitstop && <div className="hitstop">
        <span className={movelistStlyes.stat}>Hitstop</span>
        <span>{move.hitstop}</span>
      </div>}
      { move.DDoH && <div className="dd-on-hit">
        <span className={movelistStlyes.stat}>
          <Image 
            src="/games/street-fighter-6/input-icons/drive.png" 
            className="max-w-auto" 
            width={20}
            height={20}
            alt=""
          />
          DMG Hit
        </span>
        <span>{move.DDoH}</span>
      </div>}
      { move.DDoH && <div className="dd-on-block">
        <span className={movelistStlyes.stat}>
          <Image 
            src="/games/street-fighter-6/input-icons/drive.png" 
            className="max-w-auto" 
            width={20}
            height={20}
            alt=""
          />
          DMG Block
        </span>
        <span>{move.DDoH}</span>
      </div>}
      { move.DGain && <div className="drive-gain">
        <span className={movelistStlyes.stat}>
          <Image 
            src="/games/street-fighter-6/input-icons/drive.png" 
            className="max-w-auto" 
            width={20}
            height={20}
            alt=""
          />
          Gain
        </span>
        <span>{move.DGain}</span>
      </div>}
      { move.moveType && <div className="chip">
        <span className={movelistStlyes.stat}>Type</span>
        <span>{move.moveType}</span>
      </div>}
      { move.chp && <div className="chip">
        <span className={movelistStlyes.stat}>Chip</span>
        <span>{move.chp}</span>
      </div>}
      {move.xx && <div className="cancels">
        <span className={movelistStlyes.stat}>Cancels</span>
        {
          move.xx
            ? typeof move?.xx === "string" 
              ? <span>{move.xx}</span>
              : <ul>
                  {move.xx.map((c, i) => 
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
            : ""
        }
      </div>}
      {move.extraInfo && <div className={styles.extraInfo}>
        <ul>
          {move.extraInfo.map((info, i) => <li key={i}>
            {info}
          </li>)}
        </ul>
      </div>}
    </div>
  )
}