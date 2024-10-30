"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Wave } from "@/app/components/home/Wave";

import styles from '@/app/ui/page/sf6Game.module.css'
import pageStyles from '@/app/ui/page/page.module.css'

export default function AboutPage() {
  return (
    <main className={pageStyles.pageContainer}>
      <div className={`${pageStyles.pageFirst} bg-brand-accent`}>
        <span className="text-6xl">&#8859;</span>
      </div>
      <div className={`${pageStyles.pageSecond}`}>
        <Wave direction="vertical" />
        <div className="w-full block">
          <p>Just a tool for sharing data.<br/>Not affiliated with anything.</p>
        </div>
      </div>
    </main>
  )
}