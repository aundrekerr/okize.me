"use client";
import Image from 'next/image';
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
  i: number
}

const moveAdvantageDisplay = (adv: string | number) => {
  if (typeof adv === "string") return ""
  if (adv === 0) return "text-amber-200" // light yellow
  if (adv < 0 && adv > -5) return "text-rose-300" // light red
  if (adv < 0 && adv <= -5) return "text-rose-600" // red
  if (adv > 0 && adv < 5) return "text-green-300" // light green
  if (adv > 0 && adv >= 5) return "text-green-600" // green
  return ""
}

export default function MoveItem({ move }: { move: Move }) {
  return (
    <>
      <div className="move-item">
        <div className="move-image">
          {/* <Image src="https://placehold.co/210x140" width={210} height={140} alt="" className="main-img" />
          <Image src="https://placehold.co/210x140" width={210} height={140} alt="" className="backfill-img" /> */}
          <img src="https://placehold.co/225x150" className="main-img" />
          <img src="https://placehold.co/225x150/orange/white" className="backfill-img" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="move-name">
            <span className="name">{move.moveName}</span>
            <span className="command">{move.numCmd}</span>
          </div>
          <div className="data-table">
            <div className="frames">
              <div className="segment-title">Frames</div>
              <div className="data">
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
              </div>
            </div>
            <div className="on-hit-block">
              <div className="segment-title">Advantage</div>
              <div className="data">
                <div className="on-hit">
                  <span className="stat">On Hit</span>
                  <span className={moveAdvantageDisplay(move.onHit)}>{move.onHit}</span>
                </div>
                <div className="on-block">
                  <span className="stat">On Block</span>
                  <span className={moveAdvantageDisplay(move.onBlock)}>{move.onBlock}</span>
                </div>
              </div>
            </div>

            <div className="damage">
              <div className="segment-title">Attack</div>
              <div className="data">
                <div className="damage">
                  <span className="stat">Damage</span>
                  <span>{move.dmg}</span>
                </div>
                <div className="cancels">
                  <span className="stat">Cancels</span>
                  {
                    move.xx
                      ? typeof move?.xx === "string" 
                        ? <span className="stat">{move.xx}</span>
                        : <ul>
                            {move.xx.map((c, i) => <li key={i}>{c}</li>)}
                          </ul> 
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}