"use client";
import { useState, useEffect, useCallback } from 'react';
import type { Move } from "./MoveItem";
import CharacterInstalls from './CharacterInstalls';
import CharacterMovelist from './CharacterMovelist';
import CharacterQuickMovelist from './CharacterQuickMovelist';
import CharacterFeaturedMove from './CharacterFeaturedMove';
import "./styles/info.css";

type Props = {
  character: string;
  installs: { data: Move[], key: string, }[];
  frameTimelineMap: { [key: string]: { [key: string]: FrameItem[] } }
}

type FrameItem = {
  [key: string]: number
}

export default function CharacterInfo({ character, installs, frameTimelineMap }: Props) {
  // Every character's default install is "base" (maybe not, if we get a stance character like Zeku or Gen)
  const [activeInstall, setActiveInstall] = useState("base");
  const [activeMove, setActiveMove] = useState<Move | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const controller = new AbortController();
  const signal = controller.signal;

  // If the install changes, reset the active move
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    setActiveMove(null);
  }, [activeInstall])

  useEffect(() => {
    
    if (!activeMove) return;
    // If a move has a string instead of a number for its total, 
    // calculate a total based off of the timeline array instead.
    let frameCount = () => {
      if (typeof activeMove.total == "string")  {
        const moveTimeline = frameTimelineMap[activeInstall][activeMove.moveName]
        if (!moveTimeline || moveTimeline.length <= 0) return 1;
        let customTotal = 0;
        moveTimeline.forEach((item) => customTotal = customTotal + Object.values(item)[0])
        return customTotal;
      }
      return activeMove.total;
    };
    // Get all of the images for this move.
    let imagePaths = new Array(frameCount());
    imagePaths = imagePaths.fill("").map((o, i) => `/street-fighter-6/hitboxes/${character}/${activeInstall}/${activeMove.moveName}/frame0${i + 1}.png`);
    
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
        const promises = imagePaths.map(loadImage);
        const loadedImages = await Promise.all(promises);
        setImages(loadedImages);
      } catch (err) {
        controller.abort();
      }
    };
    loadImages();
    
    return () => {
      controller.abort();
    };
  }, [activeMove])

  if (!character) return <div>No character found.</div>;
  const selectedMovelist = installs.find(install => install.key === activeInstall)?.data
  if (!selectedMovelist) return <div>No movelist found.</div>;

  // // Logs the list of moves in an install as empty arrays. 
  // // Used for making new character files quickly.
  // console.log(
  //   selectedMovelist.reduce((acc, move) => {
  //     acc[move.moveName] = [];
  //     return acc;
  //   }, {})
  // )

  return (
    <div className="character-info">
      <div>
        <div className="sticky-container">
          <CharacterQuickMovelist
            key={activeMove ? activeMove.numCmd : 'no-move'}
            character={character}
            movelist={selectedMovelist}
            activeMove={activeMove}
            setActiveMove={setActiveMove}
            activeInstall={activeInstall}
          />
          {
            installs.length > 1 && 
              <CharacterInstalls
                character={character}
                installs={installs} 
                activeInstall={activeInstall}
                setActiveInstall={setActiveInstall}
              />
          }
        </div>
      </div>
      <CharacterMovelist 
        character={character}
        movelist={selectedMovelist}
        activeMove={activeMove}
        setActiveMove={setActiveMove}
        activeInstall={activeInstall}
      />
      <div>
        <div className="sticky-container">
        { 
          activeMove &&
            <CharacterFeaturedMove 
              key={activeMove.i + images.length}
              character={character}
              images={images} 
              frameRate={60} 
              move={activeMove}
              install={activeInstall}
              frameTimelineMap={frameTimelineMap[activeInstall]}
            /> 
        }
        </div>
      </div>
    </div>
  )
}