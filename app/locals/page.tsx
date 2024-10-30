"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Wave } from "@/app/components/home/Wave";

import styles from '@/app/ui/page/sf6Game.module.css'
import pageStyles from '@/app/ui/page/page.module.css'

export default function LocalsPage() {
  return (
    <main className={pageStyles.pageContainer}>
      <div className={`${pageStyles.pageFirst} bg-brand-secondary`}>
        <span className="text-6xl">&#8859;</span>
      </div>
      <div className={`${pageStyles.pageSecond}`}>
        <Wave direction="vertical" />
        <div className="w-full block">
          <p>FGC locals around the world.</p>
        </div>
      </div>
    </main>
  )
}

// import { LocalsClient } from "@/app/locals/ClientWrapper"

// export default async function LocalsPage() {
//   // const localsPromise = async () => (await fetch(process.env.BASE_URL + `/api/locals`)).json();
//   // const locals = await localsPromise();
  
//   return (
//     // <LocalsClient localsData={locals} />
//     <div>Nothin&apos; here yet.</div>
//   )
// }