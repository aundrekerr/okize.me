import React, { useRef } from 'react';

export const Phrases = () => {
  const phrasesRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (phrasesRef.current) {
      const { left, top, width, height } = phrasesRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const centerX = width / 2;
      const centerY = height / 2;
      const rotateX = ((y - centerY) / centerY) * 40; // Adjust the multiplier for more/less tilt
      const rotateY = ((x - centerX) / centerX) * -20; // Adjust the multiplier for more/less tilt

      phrasesRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (phrasesRef.current) {
      phrasesRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div 
      ref={phrasesRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="flex flex-col justify-center items-center w-full h-full"
    >
      <div className="phrases">
        <span data-phrase="pressure">pressure</span>
        <span data-phrase="起き攻め">起き攻め</span>
        <span data-phrase="wake-up">wake-up</span>
        <span data-phrase="the mix">the mix</span>
      </div>
      <span className="sub-phrase">don&apos;t think too hard.</span>
    </div>
  );
}
