"use client"
import { useState, useEffect } from 'react'

import ReduxProvider from "@/lib/ReduxProvider";

import { Wave } from "@/app/components/home/Wave";
import { Globe } from "@/app/components/locals/Globe"
import { Filters } from "@/app/components/locals/Filters"
import { Events } from "@/app/components/locals/Events"
import { FullEvent } from "@/app/components/locals/FullEvent"

import styles from '@/app/ui/locals/locals.module.css'
import pageStyles from '@/app/ui/page/page.module.css'
import { current } from '@reduxjs/toolkit';

export interface Props {
  data: LocalEvent[]
  geoCountry: string | null
}

export const Locals = ({ data, geoCountry }: Props) => {
  const [currentEvent, setCurrentEvent] = useState<LocalEvent | null>(null)
  // Get a list of events with a country
  const availableCountries = () => [... new Set(data.map((c: LocalEvent) => c.country))]

  return (
    <ReduxProvider>
      <main className={pageStyles.pageContainer}>
        <div className={`${pageStyles.pageFirst} ${styles.localsFirst}`}>
          <Globe />
        </div>
        <div className={`${pageStyles.pageSecond} ${styles.localsSecond}`}>
          <Wave direction="vertical" extraStyles={styles.waveStyles} />
          <div className="flex justify-center items-center h-[200px]">
            <p>
              FGC locals hosted around the world.<br/>Data sourced from&nbsp;
              <a rel="noopener noreferrer"target="_blank" href="https://twitter.com/ultradavid">UltraDavid</a>&apos;s&nbsp;
              <a rel="noopener noreferrer"target="_blank" href="https://docs.google.com/spreadsheets/d/1rJdulqidZY_Cdw1S30aLXMFWzttaelxIKyaK-_uZbuc/">spreadsheet</a>.
            </p>
          </div>

          <Filters 
            available={ availableCountries() } 
            geoCountry={ geoCountry } 
          />
          <Events 
            data={ data } 
            geoCountry={ geoCountry } 
            currentEvent={ currentEvent }
            setCurrentEvent={ setCurrentEvent }
          />
        </div>
      </main>
    </ReduxProvider>
  )
}