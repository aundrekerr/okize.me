import React from 'react';
import Image from 'next/image';

const notationToImageMap: { [key in Riot2XKONotation]: string } = {
  "1": "1.svg",
  "2": "2.svg",
  "3": "3.svg",
  "4": "4.svg",
  "5": "5.svg",
  "6": "6.svg",
  "7": "7.svg",
  "8": "8.svg",
  "9": "9.svg",

  "L": "L.svg",
  "M": "M.svg",
  "H": "H.svg",
  "S1": "S1.svg",
  "S2": "S2.svg",
  "T": "T.svg",
  "D": "D.svg",

  ">": "next.png",
  "or": "or",
  "/": "/"
};


function convertNotationToImages(notations: Riot2XKONotation[]): string[] {
  return notations.map(notation => notationToImageMap[notation]);
}

function parseNotationString(notationString: string): Riot2XKONotation[] {
  // Skip moves that have no inputs
  if (["-", "~", ""].includes(notationString)) return [];
  const complexNotationPattern = /([1-9]|L|M|H|S1|S2|T|D|>|or|\/)/g;
  const rawNotations = notationString.match(complexNotationPattern);

  if (!rawNotations) {
    throw new Error("Invalid notation string");
  }

  const parsedNotations: Riot2XKONotation[] = [];

  rawNotations.forEach((input) => {
    // 2XKO has no motion inputs so the chunk of logic from SF6's implementation is removed.
    if (isValidNotation(input)) {
      parsedNotations.push(input as Riot2XKONotation);
    }
  });

  return parsedNotations;
}

function isValidNotation(input: string): input is Riot2XKONotation {
  const validNotations: Riot2XKONotation[] = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "L", "M", "H", "S1", "S2", "T", "D",
    ">", "or", "/"
  ];
  return validNotations.includes(input as Riot2XKONotation);
}


interface Props {
  notationString: string
  imageSize?: number,
}

const NotationImages: React.FC<Props> = ({ notationString, imageSize = 20 }) => {
  const notations = parseNotationString(notationString.toString())
  const images = convertNotationToImages(notations);

  return (
    <div className="move-notation-list">
      {images.map((image, index) => 
        ["or", "/"].includes(image)
        ? <span key={index}>{image}</span>
        : <Image 
            key={index} 
            src={`/riot2xko/input-icons/${image}`}
            alt={image.replace(/\.[^/.]+$/, "")} 
            width={imageSize} 
            height={imageSize} 
          />
      )}
    </div>
  );
};

export default NotationImages;
