"use client";
import { useEffect, useRef } from "react";
// import { useSpring } from 'react-spring';
import { useAppSelector } from "@/lib/store";

import createGlobe from "cobe";

export const Globe = () => {
  const coordState = useAppSelector((state) => state.coords.coordState);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const locationToAngles = (lat: number, long: number) => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
  }
  const focusRef = useRef([0, 0])

  useEffect(() => {
    focusRef.current = locationToAngles(coordState[0], coordState[1]);
  }, [coordState])

  useEffect(() => {
    if (!canvasRef.current) return;
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)

    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1.00,
      diffuse: 1.05,
      mapSamples: 25000,
      mapBrightness: 3.4,
      mapBaseBrightness: 0.00, 
      baseColor: [255 / 255, 29 / 255, 142 / 255],
      markerColor: [230 / 255, 155 / 255, 34 / 255],
      // baseColor: [255 / 255, 209 / 255, 215 / 255],
      // markerColor: [94 / 255, 41 / 255, 249 / 255],
      glowColor: [20 / 255, 8 / 255, 28 / 255],
      markers: [],
      opacity: 0.8,

      onRender: (state) => {
        state.phi = currentPhi
        state.theta = currentTheta
        const [focusPhi, focusTheta] = focusRef.current
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08
        } else {
          currentPhi -= distNegative * 0.08
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2
      }
    })
    setTimeout(() => {
      if (!canvasRef.current) return;
      canvasRef.current.style.opacity = '1'
    })
    return () => { 
      globe.destroy();
      window.removeEventListener('resize', onResize);
    }
  }, [])

  return (
    <div className="locals-globe">
      <div className="canvas-wrapper">
        <div className="center-marker">&#8859;</div>
        <canvas 
          ref={canvasRef} 
          className="w-full h-full opacity-0"
          style={{ contain: 'layout paint size', transition: 'opacity 1s ease', }}
        />
      </div>
    </div>
  )
}