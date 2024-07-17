import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import moveAdvantageDisplay from "@/app/utils/moveAdvantageDisplay";
import moveCancelsDisplay from "@/app/utils/moveCancelsDisplay";
import NotationImages from "@/app/street-fighter-6/NotationImages";
import type { Move } from "@/app/street-fighter-6/[character]/MoveItem";
import FrameBar from "@/app/street-fighter-6/[character]/framebar";
import "@/app/street-fighter-6/[character]/styles/featured-move.css"

interface Props {
  images: HTMLImageElement[];
  frameRate: number;
  move: Move;
  frameTimelineMap: { [key: string]: FrameItem[] };
  setActiveMove: Function;
}

type FrameItem = {
  [key: string]: number
}

export default function CharacterFeaturedMove ({ images, frameRate, move, frameTimelineMap, setActiveMove }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);
  const tl = gsap.timeline({ paused: false });

  useEffect(() => {
    if (!timeline) {
      setTimeline(tl);
      setUpTimelineLabels(true);
    }
  }, []);

  useEffect(() => {
    setUpTimelineLabels()
  }, [images, move, frameRate]);

  const setUpTimelineLabels = (first = false) => {
    if (images.length > 0 && timeline) {
      images.forEach((img, i) => timeline.add(`#frame${i + 1}`, i === 0 ? 0 : (images.length / frameRate) / i));
    }

    if (first) {
      drawFrame(0);
      setFrameIndex(0);
    }
  }

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const image = images[index];
    if (canvas && ctx && image) {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  };

  const goToNextFrame = () => {
    if (timeline) {
      timeline.pause();
      const nextFrame = frameIndex + 1;
      if (nextFrame >= images.length) return;
      drawFrame(nextFrame);
      setFrameIndex(nextFrame);
      timeline.tweenTo(`#frame${nextFrame}`).pause();
    }
  };
  const goToPreviousFrame = () => {
    if (timeline) {
      timeline.pause();
      const prevFrame = frameIndex - 1;
      if (prevFrame < 0) return;
      drawFrame(prevFrame);
      setFrameIndex(prevFrame);
      timeline.tweenTo(`#frame${prevFrame}`).pause();
    }
  };
  const goToSpecificFrame = (val: string | number) => {
    const destination = () => {
      return typeof val === "string" 
        ? parseInt(val)
        : val;
    };

    if (timeline) {
      timeline.pause();
      drawFrame(destination());
      setFrameIndex(destination());
      timeline.tweenTo(`#frame${destination()}`).pause();
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPreviousFrame()
    if (e.key === 'ArrowRight') goToNextFrame()
  }

  const inputRangeMax = () => {
    if (typeof move.total === "string") {
      if (images.length > 0) return images.length;
      let backupTotal = 0;
      if (!frameTimelineMap[move.moveName]) return 0;
      frameTimelineMap[move.moveName].forEach((group) => {
        backupTotal = backupTotal + Object.values(group)[0];
      })
      return backupTotal - 1;
    }
    return move.total - 1;
  }

  return (
    <div className="featured-move-wrapper" style={{bottom: move ? 0 : '100vh'}}>
      <div onKeyDown={(e) => handleKeyDown(e)} tabIndex={-1}>
        {images.length > 0 && 
          <canvas
            ref={canvasRef} 
            width={1920} 
            height={1080} 
            className='max-w-full border-8 border-black'
          />
        }

        {frameTimelineMap[move?.moveName] &&
          <FrameBar
            move={move}
            inputRangeMax={inputRangeMax()}
            timeline={frameTimelineMap[move?.moveName]}
            frameIndex={frameIndex}
            goToNextFrame={goToNextFrame}
            goToPreviousFrame={goToPreviousFrame}
            goToSpecificFrame={goToSpecificFrame}
            noPlayback={images.length <= 0}
          />
        }
      </div>
      <div className="move-name">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="name">{move.moveName}</span>
            <span className="command">{move.numCmd}</span>
          </div>
          <a 
            className="close-move" 
            data-button="&#9949;" 
            onClick={() => setActiveMove(null)}
          >
            &#9949;
          </a>
        </div>
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
        <div className="on-punish-counter">
          <span className="stat">On Punish</span>
          <span className={moveAdvantageDisplay('street-fighter-6', move.onPC)}>{move.onPC}</span>
        </div>
        { move.DRoH && <div className="dr-on-hit">
          <span className="stat">
            <Image 
              src="/street-fighter-6/input-icons/drive.png" 
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
          <span className="stat">
            <Image 
              src="/street-fighter-6/input-icons/drive.png" 
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
          <span className="stat">Damage</span>
          <span>{move.dmg}</span>
        </div>
        {move.dmgScaling && <div className="damage-scaling">
          <span className="stat">Scaling</span>
          <span>{move.dmgScaling}</span>
        </div>}
        <div className="total">
          <span className="stat">Duration</span>
          <span>{move.total}</span>
        </div>
        {/* <div className="modern">
          <span className="stat">Modern</span>
          <span>{move.ezCmd}</span>
        </div> */}
        <div className="level">
          <span className="stat">Level</span>
          <span>{move.atkLvl}</span>
        </div>
        { move.hitstun && <div className="hitstun">
          <span className="stat">Hitstun</span>
          <span>{move.hitstun}</span>
        </div>}
        { move.blockstun && <div className="blockstun">
          <span className="stat">Blockstun</span>
          <span>{move.blockstun}</span>
        </div>}
        { move.hitstop && <div className="hitstop">
          <span className="stat">Hitstop</span>
          <span>{move.hitstop}</span>
        </div>}
        { move.DDoH && <div className="dd-on-hit">
          <span className="stat">
            <Image 
              src="/street-fighter-6/input-icons/drive.png" 
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
          <span className="stat">
            <Image 
              src="/street-fighter-6/input-icons/drive.png" 
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
          <span className="stat">
            <Image 
              src="/street-fighter-6/input-icons/drive.png" 
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
          <span className="stat">Type</span>
          <span>{move.moveType}</span>
        </div>}
        { move.chp && <div className="chip">
          <span className="stat">Chip</span>
          <span>{move.chp}</span>
        </div>}
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
        <div className="extra-info">
          <ul>
            {move.extraInfo.map((info, i) => <li key={i}>
              {info}
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

// moveName: string,
//   plnCmd: string,
//   numCmd: string,
//   ezCmd: string,
//   startup: string | number,
//   active: string | number,
//   recovery: string | number,
//   total: string | number,
//   onHit: string | number,
//   onPC: string | number,
//   onBlock: string | number,
//   DRoH: string | number,
//   DRoB: string | number,
//   onPP: string | number,
//   SA2oH: string | number,
//   SA2oB: string | number,
//   drinkOH: string | number,
//   drinkOB: string | number,
//   dmg: string | number,
//   dmgScaling:  string,
//   hcWinSpCa: string | number,
//   hitstun: string | number,
//   blockstun: string | number,
//   hitstop: string | number,
//   DDoH: string | number,
//   DDoB: string | number,
//   DGain: string | number,
//   SelfSoH: string | number,
//   SelfSoB: string | number,
//   OppSoH: string | number,
//   OppSoB: string | number,
//   atkLvl: string,
//   xx: string | string[],
//   extraInfo: string[],
//   moveType: string,
//   moveMotion: string,
//   moveButton: string,
//   i: number