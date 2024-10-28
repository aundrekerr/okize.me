"use client";
import { useAppSelector } from "@/lib/store";
import styles from '@/app/ui/character/page.module.css'

// This exists solely to create a dark overlay on mobile when a move is selected.
export const Curtain = () => {
  const move = useAppSelector((state) => state.move.data);
  if (move) return <div className={styles.curtain}></div>
}