"use client"
import { useRef, useEffect } from "react";
import { usePathname } from 'next/navigation'

export const BackToTop = () => {
  const backToTopRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname()

  // useEffect(() => {
  //   if (!backToTopRef.current) return;
  //   if ((pathname === '/') || (window.scrollY === 0)) {
  //     backToTopRef.current.className = "hidden"
  //   } else {
  //     backToTopRef.current.className = "back-to-top"
  //   }
  // }, []);

  const scrollBackToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div ref={backToTopRef} onClick={() => scrollBackToTop()} className={`back-to-top`}>
      <span>&#9650;</span>
    </div>
  )
}