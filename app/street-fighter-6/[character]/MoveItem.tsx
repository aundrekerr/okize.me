"use client";
import Image from 'next/image';
import moveAdvantageDisplay from "@/app/utils/moveAdvantageDisplay";
import moveCancelsDisplay from "@/app/utils/moveCancelsDisplay";
import NotationImages from "@/app/street-fighter-6/NotationImages";
import "./styles/move-item.css"

export interface Move {
  moveName: string,
  plnCmd: string,
  numCmd: string,
  ezCmd: string,
  startup: string | number,
  active: string | number,
  recovery: string | number,
  total: string | number,
  onHit: string | number,
  onPC: string | number,
  onBlock: string | number,
  DRoH: string | number,
  DRoB: string | number,
  onPP: string | number,
  SA2oH: string | number,
  SA2oB: string | number,
  drinkOH: string | number,
  drinkOB: string | number,
  dmg: string | number,
  dmgScaling:  string,
  hcWinSpCa: string | number,
  hitstun: string | number,
  blockstun: string | number,
  hitstop: string | number,
  DDoH: string | number,
  DDoB: string | number,
  DGain: string | number,
  SelfSoH: string | number,
  SelfSoB: string | number,
  OppSoH: string | number,
  OppSoB: string | number,
  atkLvl: string,
  xx: string | string[],
  extraInfo: string[],
  moveType: string,
  moveMotion: string,
  moveButton: string,
  chp: string | number,
  i: number
}

export default function MoveItem({ move }: { move: Move }) {
  return (
    <>
      <div className="move-item">
        <div className="move-name">
          <span className="name">{move.moveName}</span>
          <span className="command">{move.numCmd}</span>
          <NotationImages notationString={move.numCmd} />
        </div>
        <div className="move-data">
          <div className="startup">
            <span className="stat">Startup</span>
            <span>{move.startup}</span>
          </div>
          <div className="active">
            <span className="stat">Active</span>
            <span>{move.active}</span>
          </div>
          <div className="recovery">
            <span className="stat">Recovery</span>
            <span>{move.recovery}</span>
          </div>
          <div className="on-hit">
            <span className="stat">On Hit</span>
            <span className={moveAdvantageDisplay('street-fighter-6', move.onHit)}>{move.onHit}</span>
          </div>
          <div className="on-block">
            <span className="stat">On Block</span>
            <span className={moveAdvantageDisplay('street-fighter-6', move.onBlock)}>{move.onBlock}</span>
          </div>
          <div className="damage">
            <span className="stat">Damage</span>
            <span>{move.dmg}</span>
          </div>
          {move.xx && <div className="cancels">
            <span className="stat">Cancels</span>
            {
              move.xx
                ? typeof move?.xx === "string" 
                  ? <span>{move.xx}</span>
                  : <ul>
                      {move.xx.map((c, i) => 
                        <li key={i}>
                          <Image 
                            src={`/street-fighter-6/input-icons/${moveCancelsDisplay('street-fighter-6', c)}`} 
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
        </div>
      </div>
    </>
  )
}