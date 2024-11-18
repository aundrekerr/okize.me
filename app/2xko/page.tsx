"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';

import ReduxProvider from "@/lib/ReduxProvider";

import { Wave } from "@/app/components/home/Wave";
import { Roster } from '@/app/components/game/Roster'
import config from "@/app/2xko/config"

import styles from '@/app/ui/page/game-page.module.css'
import pageStyles from '@/app/ui/page/page.module.css'

export default function Riot2XKOPage() {
  const characters = Object.entries(config())
    .filter(([key, character]) => !character.hasOwnProperty("unreleased"))
    .map(([key, character]) => ({ name: character.name, slug: key }));
  
  return (
    <ReduxProvider>
      <main className={pageStyles.pageContainer}>
        <div className={`${pageStyles.pageFirst} ${styles.gameFirst}`} style={{ backgroundImage: `url('/games/riot2xko/cover2.png')` }}>
          <Roster game="riot2xko" characters={characters} />
        </div>
        <div className={`${pageStyles.pageSecond} ${styles.gameSecond}`}>
          <Wave direction="vertical" />
          <div className="w-full block">
            <p>It&apos;s coming out soon, right?</p>
          </div>
        </div>
      </main>
    </ReduxProvider>
  )
}