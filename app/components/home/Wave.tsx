import React, { useEffect, useRef } from 'react';

interface WaveComponentProps {
  direction?: 'horizontal' | 'vertical';
}

export const Wave: React.FC<WaveComponentProps> = ({ direction = 'horizontal' }) => {
  const waveRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    let width = container ? container.offsetWidth : window.innerWidth;
    let height = container ? container.offsetHeight : window.innerHeight;
    const wave = waveRef.current;

    const waveWidth = direction === 'horizontal' ? width : 10; // Width of wave for horizontal direction
    const waveHeight = direction === 'horizontal' ? 10 : height; // Height of wave for vertical direction
    const waveDelta = 10; // Wave amplitude
    const speed = 1; // Wave animation speed
    const wavePoints = 5; // How many points will be used to compute our wave

    const calculateWavePoints = (factor: number) => {
      const points = [];

      for (let i = 0; i <= wavePoints; i++) {
        const x = direction === 'horizontal' ? (i / wavePoints) * waveWidth : waveHeight;
        const y = direction === 'horizontal' ? waveHeight : (i / wavePoints) * waveHeight;
        const sinSeed = (factor + (i + i % wavePoints)) * speed * 100;
        const sinHeight = Math.sin(sinSeed / 100) * waveDelta;
        const yPos = direction === 'horizontal' ? Math.sin(sinSeed / 100) * sinHeight + waveHeight : y;
        const xPos = direction === 'horizontal' ? x : Math.sin(sinSeed / 100) * sinHeight + waveWidth;
        points.push({ x: xPos, y: yPos });
      }

      return points;
    };

    const buildPath = (points: { x: number; y: number }[]) => {
      let SVGString = `M ${points[0].x} ${points[0].y}`;

      const cp0 = {
        x: direction === 'horizontal' ? (points[1].x - points[0].x) / 2 : points[0].x + (points[1].x - points[0].x),
        y: direction === 'horizontal' ? points[0].y + (points[1].y - points[0].y) : (points[1].y - points[0].y) / 2
      };

      SVGString += ` C ${cp0.x} ${cp0.y} ${cp0.x} ${cp0.y} ${points[1].x} ${points[1].y}`;

      let prevCp = cp0;
      let inverted = -1;

      for (let i = 1; i < points.length - 1; i++) {
        const cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
        const cp1 = {
          x: direction === 'horizontal' ? (points[i].x - prevCp.x) + points[i].x : points[i].x,
          y: direction === 'horizontal' ? (points[i].y - prevCp.y) + points[i].y : (points[i].y - prevCp.y) + points[i].y
        };

        SVGString += ` C ${cp1.x} ${cp1.y} ${cp1.x} ${cp1.y} ${points[i + 1].x} ${points[i + 1].y}`;
        prevCp = cp1;
        inverted = -inverted;
      }

      SVGString += direction === 'horizontal' ? ` L ${width} ${height}` : ` L ${width} ${height}`;
      SVGString += ` L 0 ${height} Z`;
      return SVGString;
    };

    let lastUpdate: number | undefined;
    let totalTime = 0;

    const tick = () => {
      const now = Date.now();

      if (lastUpdate) {
        const elapsed = (now - lastUpdate) / 1000;
        lastUpdate = now;

        totalTime += elapsed;

        const factor = totalTime * Math.PI;
        if (wave) {
          wave.setAttribute('d', buildPath(calculateWavePoints(factor)));
        }
      } else {
        lastUpdate = now;
      }

      requestAnimationFrame(tick);
    };

    tick();

    const handleResize = () => {
      width = container ? container.offsetWidth : window.innerWidth;
      height = container ? container.offsetHeight : window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [direction]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }} className="svg-wave">
      <svg width="100%" height="100%">
        <path id="wave" ref={waveRef} fill="currentColor" />
      </svg>
    </div>
  );
};
