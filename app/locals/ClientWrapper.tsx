"use client";
import { useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';

import ReduxProvider from "@/lib/ReduxProvider";
import { Globe } from "@/app/locals/Globe"
import { Filters } from "@/app/locals/Filters"
// import { ListItem } from "@/app/locals/ListItem"

// import "@/app/split-page.css";
import "@/app/locals/locals.css";

export const LocalsClient = ({ localsData }: { localsData: LocalEvent[] }) => {
  const locals = localsData.filter((value, index, array) => array.indexOf(value) === index);
  const [filters, setFilters] = useState({
    name: '',
    country: null,
    subdivision: null,
    metro: '',
    games: [],
  });
  console.log(localsData)

  return (
    <ReduxProvider>
      <main className="split-page locals-page">
        <section className="locked-in-place globe">
          { locals && <Globe /> }
        </section>
        <section className="page-content">
          <h1>Locals</h1>
          <p>Homegrown FGC events around the world. Data sourced from <Link href="https://docs.google.com/spreadsheets/d/1rJdulqidZY_Cdw1S30aLXMFWzttaelxIKyaK-_uZbuc/">UltraDavid&apos;s spreadsheet</Link>.</p>
          {/* <Filters filters={filters} setFilters={setFilters} /> */}
          <ul className="locals-event-list">
            {locals.map((event: LocalEvent, i) => 
              <motion.li 
                key={`${event.id}-${i}`}
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.3, delay: 0.015 * i }}
              >
                {/* <ListItem event={event} /> */}
              </motion.li>
            )}
          </ul>
        </section>
      </main>
    </ReduxProvider>
  )
}