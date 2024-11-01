import React from 'react';
import Image from 'next/image';

const notationToImageMap: { [key in SF6Notation]: string } = {
  "1": "1.png",
  "2": "2.png",
  "3": "3.png",
  "4": "4.png",
  "5": "5.png",
  "6": "6.png",
  "7": "7.png",
  "8": "8.png",
  "9": "9.png",

  // "236": "236.png",
  // "214": "214.png",
  // "623": "623.png",
  // "421": "421.png",
  // "63214": "63214.png",
  // "41236": "41236.png",
  // "64": "64.png",
  // "46": "46.png",
  // "28": "28.png",
  // "18": "18.png",
  "4268": "4268.png",

  "P": "P.png",
  "K": "K.png",
  "LP": "LP.png",
  "MP": "MP.png",
  "HP": "HP.png",
  "LK": "LK.png",
  "MK": "MK.png",
  "HK": "HK.png",

  ">": "next.png",
  "or": "or",
  "/": "/"
};


function convertNotationToImages(notations: SF6Notation[]): string[] {
  return notations.map(notation => notationToImageMap[notation]);
}

function parseNotationString(notationString: string): SF6Notation[] {
  // Skip moves that have no inputs
  if (["-", "~", ""].includes(notationString)) return [];
  // const complexNotationPattern = /(236|214|623|421|63214|41236|46|64|28|18|4268|[1-9]|LP|MP|HP|LK|MK|HK|P|K|>)/g;
  const complexNotationPattern = /(4268|[1-9]|LP|MP|HP|LK|MK|HK|P|K|>|or|\/)/g;
  const rawNotations = notationString.match(complexNotationPattern);

  if (!rawNotations) {
    throw new Error("Invalid notation string");
  }

  const parsedNotations: SF6Notation[] = [];

  rawNotations.forEach((input) => {
    // Check for combined directional and button inputs (e.g., "236P")
    // In the future, this gets reworked to make full motion input images instead of cardinal directions
    // const combinedInputPattern = /^(236|214|623|421|63214|41236|64|46|28|18|4268)(P|K)$/;
    const combinedInputPattern = /^(64|46|28|18|4268)(P|K)$/;
    const match = input.match(combinedInputPattern);

    if (match) {
      parsedNotations.push(match[1] as SF6DirectionalNotation, match[2] as SF6ButtonNotation);
    } else if (isValidNotation(input)) {
      parsedNotations.push(input as SF6Notation);
    }
  });

  return parsedNotations;
}

function isValidNotation(input: string): input is SF6Notation {
  const validNotations: SF6Notation[] = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9",
    // "236", "214", "623", "421", "63214", "41236", 
    // "64", "46", "28", "18", 
    "4268",
    "LP", "MP", "HP", "LK", "MK", "HK", "P", "K",
    ">", "or", "/"
  ];
  return validNotations.includes(input as SF6Notation);
}


// interface Props {
//   notations: Notation[];
// }
interface Props {
  notationString: string
  isCharge: boolean,
  imageSize?: number,
}

const NotationImages: React.FC<Props> = ({ notationString, isCharge, imageSize = 20 }) => {
  const notations = parseNotationString(notationString.toString())
  const images = convertNotationToImages(notations);

  return (
    <div className="move-notation-list">
      {images.map((image, index) => 
        ["or", "/"].includes(image)
        ? <span key={index}>{image}</span>
        : <Image 
            key={index} 
            src={`/games/street-fighter-6/input-icons/${(isCharge && index === 0) ? `charge-${image}` : image}`} 
            alt={image.replace(/\.[^/.]+$/, "")} 
            width={imageSize} 
            height={imageSize} 
          />
      )}
    </div>
  );
};

export default NotationImages;
