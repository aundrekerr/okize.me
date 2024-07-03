import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import type { Move } from "./MoveItem";

interface Props {
  images: HTMLImageElement[];
  frameRate: number;
  move: Move;
}

export default function CharacterFeaturedMove ({ images, frameRate, move }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);
  const inputRangeMax = () => {
    if (typeof move.total === "string") {
      return parseInt(move.total.replace(/[0-9]/g, '')) - 1;
    }
    return move.total - 1;
  }

  const tl = gsap.timeline({
    paused: false,
    onComplete: () => {},
    onUpdate: () => {
      // const frame = Math.floor(tl.progress() * (images.length - 1));
      // console.log(frame)
      // drawFrame(frame);
      // setFrameIndex(frame);
    }
  });

  useEffect(() => {
    if (!timeline) {
      setTimeline(tl);
    }
  }, []);

  useEffect(() => {
    if (images.length > 0 && timeline) {
      // timeline.to({}, {
      //   duration: images.length / frameRate,
      //   ease: 'none'
      // });
      images.forEach((img, i) => timeline.add(`#frame${i + 1}`, i === 0 ? 0 : (images.length / frameRate) / i));
    }
  }, [images, move, frameRate]);


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

  const startPlaying = () => {
    if (timeline) {
      timeline
        .progress(0)
        .pause()
        .play()
        .then(() => {
          drawFrame(0);
          setFrameIndex(0);
          timeline.tweenTo('#frame0').pause();
        })
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

  return (
    <div>
      <h4>{move.moveName}</h4>
      <canvas ref={canvasRef} width={1920} height={1080} className='max-w-full border border-white' />
      <div>
        <button onClick={goToPreviousFrame}>Previous Frame</button>
        <button onClick={startPlaying}>Play</button>
        <button onClick={goToNextFrame}>Next Frame</button>
      </div>
      <input type='range' min='0' max={inputRangeMax()} step='1' value={frameIndex} onChange={(e) => goToSpecificFrame(e.target.value)} className='w-full'/>
    </div>
  );
};