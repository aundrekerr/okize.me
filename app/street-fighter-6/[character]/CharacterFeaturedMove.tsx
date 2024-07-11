import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
// import config from "@/app/street-fighter-6/config"
import type { Move } from "./MoveItem";
import FrameBar from "./framebar";

interface Props {
  character: string;
  images: HTMLImageElement[];
  frameRate: number;
  move: Move;
  install: string;
  frameTimelineMap: { [key: string]: FrameItem[] }
}

type FrameItem = {
  [key: string]: number
}

export default function CharacterFeaturedMove ({ character, images, frameRate, move, install, frameTimelineMap }: Props) {
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
  );
};