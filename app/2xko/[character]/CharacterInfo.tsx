"use client";
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import "./styles/info.css";

import type { Move } from "./MoveItem";

type Props = {
  character: string;
  installs: { data: Move[], key: string, }[];
}

export const CharacterInfo = ({ character, installs }: Props) => {
  const [activeInstall, setActiveInstall] = useState("base");
  const [activeMove, setActiveMove] = useState<Move | null>(null);

  return (
    <main className="riot2xko-character-page">
      <p>Nothing here yet.</p>
      <ul>
        <li><Image src={`/riot2xko/input-icons/1.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/2.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/3.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/4.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/5.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/6.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/7.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/8.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/9.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/L.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/M.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/H.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/D.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/T.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/S1.svg`} width={20} height={20} alt=""/></li>
        <li><Image src={`/riot2xko/input-icons/S2.svg`} width={20} height={20} alt=""/></li>
      </ul>
    </main>
  )
}