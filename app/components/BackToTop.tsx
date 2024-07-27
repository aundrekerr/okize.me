"use client"
import { useRef } from "react";

export const BackToTop = () => {
  const backToTopRef = useRef<HTMLDivElement>(null);
  const scrollBackToTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <div ref={backToTopRef} onClick={() => scrollBackToTop()} className="back-to-top">
      <span>&#9650;</span>
    </div>
  )
}