"use client";
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image'

import slugify from "@/app/utils/slugify";
import { SF6Move } from '@/lib/types/Move';
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setMoveState, setInstallState } from "@/lib/features/moveSlice";

import { NoMove } from '@/app/components/character/FeaturedMove/NoMove'
import { FrameTimeline } from '@/app/components/character/FeaturedMove/FrameTimeline'
import { MoveData } from '@/app/components/character/FeaturedMove/MoveData'

import styles from '@/app/ui/character/featured-move.module.css'
import canvasStyles from '@/app/ui/character/featured-move/canvas.module.css'
import movelistStyles from '@/app/ui/character/movelist.module.css'

const Loading = () => (
  <div className={canvasStyles.loadingWrapper}>
    <div className={canvasStyles.loading}></div>
  </div>
)

interface Props {
  character: string
  config: any
  movesConfig: any
}

export const FeaturedMove = ({ character, config, movesConfig }: Props) => {
  const dispatch = useAppDispatch();
  const move = useAppSelector((state) => state.move.data);
  const install = useAppSelector((state) => state.move.install);
  const frameTimelineMap = () => {
    if (!move) return null;
    return movesConfig[install][move.moveName]
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [frameRate, setFrameRate] = useState(60);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);
  const tl = gsap.timeline({ paused: false });
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const handleFeaturedMoveClose = () => {
    dispatch(setMoveState(null));
  }

  useEffect(() => {
    if (!timeline) {
      setTimeline(tl);
      setUpTimelineLabels(true);
    }
  }, []);

  useEffect(() => {
    setUpTimelineLabels(true);
  }, [images, move, frameRate]);

  useEffect(() => {
    if (!move || !frameTimelineMap) return;
    // If a move has a string instead of a number for its total, 
    // calculate a total based off of the timeline array instead.
    let frameCount = () => {
      if (typeof move.total == "string")  {
        const moveTimeline = frameTimelineMap();
        if (!moveTimeline || moveTimeline.length <= 0) return 1;
        let customTotal = 0;
        moveTimeline.forEach((item: any) => customTotal = customTotal + (Object as any).values(item)[0])
        return customTotal;
      }
      return move.total;
    };  

    // Get all of the images for this move.
    let imagePaths = new Array(frameCount());
    imagePaths = imagePaths.fill("").map((o, i) => `/street-fighter-6/hitboxes/${character}/${install}/${move.moveName}/frame0${i + 1}.png`);
    
    // Set up abort controller to stop fetching if we don't get one 
    // of the images. This prevents attempting to fetch hundreds of 
    // frames if we don't have any images at all for a move.
    const controller = new AbortController();
    const signal = controller.signal;

    const loadImage = (url: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        // Set the image array to be empty so we don't render the canvas.
        img.onerror = (err) => {reject(err); setImages([]);}

        signal.addEventListener('abort', () => {
          img.src = ''; // Cancel image loading
          reject(new Error('Image load aborted'));
        });
      });
    };

    // Try loading the images, if a single one fails, abort the process.
    const loadImages = async () => {
      try {
        // Reset them all
        setImages([]);
        setImagesLoaded(false);
        setImageLoadFailed(false);
        // Get the list of urls 
        const response = await fetch(`/api/hitboxes?move=street-fighter-6/hitboxes/${character}/${install}/${move.moveName}/`);
        const data = await response.json();
        let urls = data.files;
        // Filter out the instance that is just the directory itself
        urls = urls.filter((url: string) => url.includes('frame'))
        // Stop if we have no images
        if (urls.length <= 0) {
          setImages([]);
          setImagesLoaded(false);
          setImageLoadFailed(true);
          return;
        }
        // Sort them because they're prefixed with a zero.
        const sortUrls = (arr: string[]): string[] => {
          return arr.sort((a, b) => {
            const numA = parseInt(a.match(/frame(\d+)/)?.[1] || "0", 10);
            const numB = parseInt(b.match(/frame(\d+)/)?.[1] || "0", 10);
            return numA - numB;
          });
        };
        urls = sortUrls(urls);
        // Attempt to fetch each image and load them
        const promises = urls.map(loadImage);
        const loadedImages = await Promise.all(promises);
        // Setting states
        setImages(loadedImages);
        setImagesLoaded(true);
        setImageLoadFailed(false);
      } catch (err) {
        controller.abort();
        console.error('Error fetching files:', err);
        setImages([]);
        setImagesLoaded(false);
        setImageLoadFailed(true);
      }
    };
    loadImages();
    
    return () => {
      controller.abort();
    };
  }, [move])

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

  const goToNextFrame = () => { // fix logic to work without images
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

  if (!move) return <NoMove />;
  return (
    <AnimatePresence>
      <motion.div 
        className={styles.featuredMoveWrapper}
        style={{bottom: move ? 0 : '100vh'}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1
        }}
      >

        <div className={styles.featuredMove}>
          <div className={styles.featuredMoveHeader}>
            <div className={movelistStyles.moveNameWrapper}>
              <span className={movelistStyles.moveName}>{move.moveName}</span>
              <span className={movelistStyles.moveCmd}>{move.numCmd}</span>
            </div>
            <div onClick={() => handleFeaturedMoveClose()}>
              <NextImage width="24" height="24" src="/icons/close.svg" alt="close icon" />
            </div>
          </div>
          <div className={canvasStyles.canvasWrapper}>
            <div className={styles.canvasWrapper}>
              {!imageLoadFailed && (!imagesLoaded 
                ? <Loading />
                : <canvas
                    ref={canvasRef} 
                    width={1280} 
                    height={720} 
                    className='max-w-full border-8 border-b-0 border-black'
                  />)
              }
            </div>
            <FrameTimeline 
              timeline={frameTimelineMap()} 
              images={images} 
              frameIndex={frameIndex}
              goToNextFrame={goToNextFrame}
              goToPreviousFrame={goToPreviousFrame}
              goToSpecificFrame={goToSpecificFrame}
            />
            <MoveData move={move} />
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  )
}