import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface ImageSequencePlayerProps {
  images: HTMLImageElement[];
  frameRate: number;
}

const ImageSequencePlayer: React.FC<ImageSequencePlayerProps> = ({ images, frameRate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (images.length > 0 && !timeline) {
      const tl = gsap.timeline({
        paused: true,
        onUpdate: () => {
          const frame = Math.floor(tl.progress() * (images.length - 1));
          drawFrame(frame);
          setFrameIndex(frame);
        }
      });

      tl.to({}, {
        duration: images.length / frameRate,
        ease: 'none'
      });

      for (let i = 0; i < images.length; i++) {
        // const element = array[index];
        tl.add(`#frame${i + 1}`, i === 0 ? 0 : (images.length / frameRate) / i) 
      }

      setTimeline(tl);
      tl.play()
    }

  }, [images, frameRate, timeline]);

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

  const resetTimeline = () => {
    if (timeline) {
      drawFrame(0);
      setFrameIndex(0);
      timeline
      .progress(0)
      .pause()
    }
  }

  const startPlaying = () => {
    if (timeline) {
      timeline
        .progress(0)
        .pause()
        .play()
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

  const goToSpecificFrame = (e: any) => {
    const destination = e.target.value as number;
    if (timeline) {
      timeline.pause();
      drawFrame(destination);
      setFrameIndex(destination);
      timeline.tweenTo(`#frame${destination}`).pause();
    }
  }

  return (
    <div>
      <canvas ref={canvasRef} width={1920} height={1080} className='max-w-full border border-white' />
      <div>
        <button onClick={goToPreviousFrame}>Previous Frame</button>
        <button onClick={startPlaying}>Play</button>
        <button onClick={goToNextFrame}>Next Frame</button>
      </div>
      <input type='range' min='0' max='33' step='1' value={frameIndex} onChange={(e) => goToSpecificFrame(e)} className='w-full'/>
    </div>
  );
};

export default ImageSequencePlayer;
