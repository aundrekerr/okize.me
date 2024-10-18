"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image'

import { SF6Move } from '@/lib/types/Move';
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";

import Tooltip from "@mui/material/Tooltip";
import { OKZTooltip } from "@/app/components/tooltip";

import styles from '@/app/ui/character/featured-move/frame-timeline.module.css'

interface Props {
  timeline: any
  images: HTMLImageElement[]
  frameIndex: number
  goToNextFrame: Function
  goToPreviousFrame: Function
  goToSpecificFrame: Function
}

type FrameItem = {
  [key: string]: number
}

export const FrameTimeline = ({ timeline, images, frameIndex, goToNextFrame, goToPreviousFrame, goToSpecificFrame, }: Props) => {
  const move = useAppSelector((state) => state.move.data);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const frameBarTimelineGroupsRef = useRef<HTMLDivElement>(null);
  const frameBarShadowWidth = frameBarTimelineGroupsRef.current ? frameBarTimelineGroupsRef?.current.offsetWidth : '0'
  const inputRef = useRef<HTMLInputElement>(null);
  
  const numberArray = (num: number) => new Array(num).fill("").map((_, i) => i + 1);
  const findFrameIndex = (groupIndex: number, interiorIndex: number) => {
    let frameCount = 0
    timeline.forEach((group: [string: number], index: number) => {
      if (index < groupIndex) {
        frameCount += (Object as any).values(group)[0]
      }
    })
    return frameCount + interiorIndex - 1;
  }

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
                  
  const mouseIsDown = (e:any) => {
    if (!timelineContainerRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - timelineContainerRef.current.offsetLeft);
    setScrollLeft(timelineContainerRef.current.scrollLeft);
  }
  const mouseUp = (e:any) => {
    setIsDown(false);
  }
  const mouseLeave = (e:any) => {
    setIsDown(false);
  }
  const mouseMove = (e:any) => {
    if (!timelineContainerRef.current) return;
    if(isDown){
      e.preventDefault();

      //Move Horizontally
      const x = e.pageX - timelineContainerRef.current.offsetLeft;
      const walkX = x - startX;
      timelineContainerRef.current.scrollLeft = scrollLeft - walkX;
    }
  }

  const inputRangeMax = () => {
    if (!move) return;
    if (typeof move.total === "string") {
      if (images.length > 0) return images.length - 1;
      let backupTotal = 0;
      timeline.forEach((group: [string: number]) => {
        backupTotal = backupTotal + Object.values(group)[0];
      })
      return backupTotal - 1;
    }
    return move.total - 1;
  }

  const frameTimelineTooltip = {
    title: 'Frame Timeline',
    subtitle: 'Legend',
    desc: 'A frame is the smallest unit of time used by the game, with a single frame being 1/60th of a second. The meter shows how much time character actions take to perform, with each notch on the meter representing a single frame.\n\nWhile the notch only shows one colour, a single frame can have multiple properties behind it.'
  }

  return (
    <div className={styles.frameTimelineWrapper}>
      <div className={styles.ftControls}>
        <Tooltip 
          followCursor
          title={
            <OKZTooltip
              title={frameTimelineTooltip.title}
              subtitle={frameTimelineTooltip.subtitle}
              desc={frameTimelineTooltip.desc}
            />
          }
        >
          <div className={styles.ftInfo}>
            <Image src='/icons/info-i.svg' width="5" height="20" alt=""/>
          </div>
        </Tooltip>
        <div className={styles.ftInputContainer}>
          <input 
            ref={inputRef} 
            type='range' 
            min='0' 
            max={inputRangeMax()} 
            step='1' 
            value={frameIndex}
            onChange={(e) => goToSpecificFrame(e.target.value)}
          />
        </div>
        <div className={styles.ftNextPrev}>
          <button onClick={() => goToPreviousFrame()}><Image src='/icons/arrow-left.svg' width="15" height="24" alt=""/></button>
          <button onClick={() => goToNextFrame()}><Image src='/icons/arrow-right.svg' width="15" height="24" alt=""/></button>
        </div>
      </div>
      <div 
          ref={timelineContainerRef} 
          className={styles.ftTimeline} 
          style={{"--frame_bar--timeline--seeker_bg": `${frameBarShadowWidth}px`} as React.CSSProperties}
          onMouseDown={mouseIsDown}
          onMouseUp={mouseUp}
          onMouseMove={mouseMove}
          onMouseLeave={mouseLeave}
        >
          <div ref={frameBarTimelineGroupsRef} className={styles.ftGroups}>
            {timeline.map((group: FrameItem, groupIndex: number) =>     
              <div key={`block-${groupIndex}`} className={styles.ftBlock}>
                {Object.entries(group).map(([status, duration], index) => 
                  <div key={`group-${groupIndex}-${status}`} className={styles.ftGroup}>
                    {numberArray(duration).map(n => 
                      <div 
                        key={`group-${groupIndex}-${status}-frame-${n}`} 
                        className={`${styles.ftFrame} ${styles[`ftFrameBg__${status}`]}`} 
                        onClick={() => goToSpecificFrame(findFrameIndex(groupIndex, n))}
                      >
                        { <span className={styles.ftNumber}>
                            {n === duration && <span>{duration}</span>}
                          </span>
                        }
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <span
            className={styles.ftSeeker} 
            data-frame={frameIndex + 1} 
            style={{left: `calc(${frameIndex} * 1rem)`}}
          />
        </div>
    </div>
  )
}