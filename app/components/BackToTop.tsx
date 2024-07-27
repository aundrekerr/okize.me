"use client"
import { useRef } from "react";
import { usePathname } from 'next/navigation'

export const BackToTop = () => {
  const backToTopRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname()
  const scrollBackToTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <div ref={backToTopRef} onClick={() => scrollBackToTop()} className={`back-to-top ${(pathname === '/' && window.scrollY === 0) ? 'hidden' : ''}`}>
      <span>&#9650;</span>
    </div>
  )
}