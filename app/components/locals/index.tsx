"use client"
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';

import ReduxProvider from "@/lib/ReduxProvider";

import { Globe } from "@/app/components/locals/Globe"
import { Wave } from "@/app/components/home/Wave";

import styles from '@/app/ui/locals/locals.module.css'
import pageStyles from '@/app/ui/page/page.module.css'

interface Props {
  data: LocalEvent[]
}

export const Locals = ({ data }: Props) => {
  return (
    <ReduxProvider>
      <main className={pageStyles.pageContainer}>
        <div className={`${pageStyles.pageFirst} bg-brand-secondary`}>
          <Globe />
        </div>
        <div className={`${pageStyles.pageSecond}`}>
          <Wave direction="vertical" />
          <div className="w-full block">
            <p>FGC locals around the world.<br/>
            Data sourced from&nbsp;
              <a rel="noopener noreferrer"target="_blank" href="https://twitter.com/ultradavid">UltraDavid</a>&apos;s
              &nbsp;
              <a rel="noopener noreferrer"target="_blank" href="https://docs.google.com/spreadsheets/d/1rJdulqidZY_Cdw1S30aLXMFWzttaelxIKyaK-_uZbuc/">spreadsheet</a>
            .
            </p>
          </div>
        </div>
      </main>
    </ReduxProvider>
  )
}