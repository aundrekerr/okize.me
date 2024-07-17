import React, { useRef, useEffect, useState } from 'react';
import type { Move } from "./../MoveItem";
import "./../styles/framebar.css"

type Props = {
  move: Move;
  inputRangeMax: number;
  frameIndex: number;
  timeline: FrameItem[];
  goToNextFrame: Function;
  goToPreviousFrame: Function;
  goToSpecificFrame: Function;
  noPlayback: boolean;
}

type FrameItem = {
  [key: string]: number
}

export default function FrameBar({ move, inputRangeMax, timeline, frameIndex, goToNextFrame, goToPreviousFrame, goToSpecificFrame, noPlayback }: Props)  {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const frameBarTimelineGroupsRef = useRef<HTMLDivElement>(null);
  const frameBarShadowWidth = frameBarTimelineGroupsRef.current ? frameBarTimelineGroupsRef?.current.offsetWidth : '0'
  const inputRef = useRef<HTMLInputElement>(null);
  
  const numberArray = (num: number) => new Array(num).fill("").map((_, i) => i + 1);
  const findFrameIndex = (groupIndex: number, interiorIndex: number) => {
    let frameCount = 0
    timeline.forEach((group, index) => {
      if (index < groupIndex) {
        frameCount += Object.values(group)[0]
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

  return (
    <>
      <div className={`frame_bar ${noPlayback && "border-t-8 border-black"}`}>
        <div className="frame_bar--playback_controls">
          <div className="frame_bar--info">
            <button>&#9432;</button>
          </div>
          <div className="frame_bar--input">
            <input ref={inputRef} type='range' min='0' max={inputRangeMax} step='1' value={frameIndex} onChange={(e) => goToSpecificFrame(e.target.value)} className='w-full mr-2'/>
          </div>
          <div className="frame_bar--control_group">
            <button onClick={() => goToPreviousFrame()}>ᐊ</button>
            <button onClick={() => goToNextFrame()}>ᐅ</button>
          </div>
        </div>
        <div 
          ref={timelineContainerRef} 
          className="frame_bar--timeline" 
          style={{"--frame_bar--timeline--seeker_bg": `${frameBarShadowWidth}px`} as React.CSSProperties}
          onMouseDown={mouseIsDown}
          onMouseUp={mouseUp}
          onMouseMove={mouseMove}
          onMouseLeave={mouseLeave}
        >
          <div ref={frameBarTimelineGroupsRef} className="frame_bar--timeline--groups">
            {timeline.map((group, groupIndex) =>     
              <div key={`block-${groupIndex}`} className="frame_bar--timeline--block">
                {Object.entries(group).map(([status, duration], index) => 
                  <div key={`group-${groupIndex}-${status}`} className="frame_bar--timeline-group">
                    {numberArray(duration).map(n => 
                      <div key={`group-${groupIndex}-${status}-frame-${n}`} className={`frame_bar--timeline-frame frame-bg__${status}`} onClick={() => goToSpecificFrame(findFrameIndex(groupIndex, n))}>
                        { <span v-if="n === duration" className="frame_bar--timeline-number">
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
          <span className={`frame_bar--seeker frame-border__`} data-frame={frameIndex + 1} style={{left: `calc(${frameIndex} * 1rem)`}} />
        </div>
      </div>
    </>
  )
}