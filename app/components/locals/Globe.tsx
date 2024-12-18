"use client";
import { useEffect, useRef } from "react";
import Image from 'next/image'

import createGlobe from "cobe";

import { useAppSelector } from "@/lib/store";

import styles from '@/app/ui/locals/globe.module.css'

export const Globe = () => {
  const globeState = useAppSelector((state) => state.locals.globe);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const locationToAngles = (lat: number, long: number) => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
  }
  const focusRef = useRef([0, 0])

  // if ("geolocation" in navigator) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const lat = position.coords.latitude;
  //     const lng = position.coords.longitude;
  //     console.log(`Latitude: ${lat}, longitude: ${lng}`);
  //     focusRef.current = locationToAngles(lat, lng)
  //     }, (error) => console.error("Error getting user location:", error)
  //   );
  // } else {
  //   // Geolocation is not supported by the browser
  //   console.error("Geolocation is not supported by this browser.");
  // }

  useEffect(() => {
    focusRef.current = locationToAngles(globeState[0], globeState[1]);
  }, [globeState])

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
      // baseColor: [255 / 255, 29 / 255, 142 / 255],
      // markerColor: [230 / 255, 155 / 255, 34 / 255],
      baseColor: [0 / 255, 82 / 255, 100 / 255],
      markerColor: [94 / 255, 41 / 255, 249 / 255],
      glowColor: [106 / 255, 204 / 255, 255 / 255],
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
    <div className={styles.globe}>
      <div className={styles.canvasWrapper}>
        <div className={styles.centerMarker}>
          <Image src="/icons/okz-white.svg" alt="okize.me logo" width={20} height={13} />
        </div>
        <canvas 
          ref={canvasRef} 
          style={{ contain: 'layout paint size', transition: 'opacity 1s ease', }}
        />
      </div>
    </div>
  )
}