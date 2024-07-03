"use client";
import { useState, useEffect } from 'react';
import type { Move } from "./MoveItem";
import CharacterInstalls from './CharacterInstalls';
import CharacterMovelist from './CharacterMovelist';
import CharacterQuickMovelist from './CharacterQuickMovelist';
import CharacterFeaturedMove from './CharacterFeaturedMove';
import "./styles/info.css";

export default function CharacterInfo({ character, installs }: { character: string, installs: { data: Move[], key: string, }[] }) {
  // Every character's default install is "base" (maybe not, if we get a stance character like Zeku or Gen)
  const [activeInstall, setActiveInstall] = useState("base");
  const [activeMove, setActiveMove] = useState<Move | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  // If the install changes, reset the active move
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    setActiveMove(null);
  }, [activeInstall])

  useEffect(() => {
    if (!activeMove) return;
    let frameCount = activeMove.total;
    let imagePaths = new Array(frameCount);
    imagePaths = imagePaths.fill(0).map((o, i) => `/street-fighter-6/hitboxes/${character}/${activeMove.numCmd}/frame0${i + 1}.png`);
    
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        imagePaths.map((path) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = path.toString();
            img.onload = () => resolve(img);
          });
        })
      );
      setImages(loadedImages);
    };

    loadImages();
  }, [activeMove])

  if (!character) return;
  const selectedMovelist = installs.find(install => install.key === activeInstall)?.data
  if (!selectedMovelist) return;

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
          activeMove && images.length > 0 &&
            <CharacterFeaturedMove 
              key={activeMove.i}
              images={images} 
              frameRate={60} 
              move={activeMove}
            /> 
        }
        {/* { activeMove && <CharacterFeaturedMove src="https://cdn.glitch.com/c162fc32-0a96-4954-83c2-90d4cdb149fc%2FBig_Buck_Bunny_360_10s_20MB.mp4?v=1587545460302" /> } */}
        </div>
      </div>
    </div>
  )
}