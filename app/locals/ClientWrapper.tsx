"use client";
import { useState } from 'react'

import ReduxProvider from "@/lib/ReduxProvider";
import { Globe } from "@/app/locals/Globe"
import { ListItem } from "@/app/locals/ListItem"

import "@/app/split-page.css";
import "@/app/locals/locals.css";

export const LocalsClient = ({ localsData }: { localsData: LocalEvent[] }) => {
  const locals = localsData.filter((value, index, array) => array.indexOf(value) === index);
  const [filter, setFilter] = useState({
    name: '',
    country: null,
    subdivision: null,
    metro: '',
    games: [],
  });

  return (
    <ReduxProvider>
      <main className="split-page locals-page">
        <section className="locked-in-place globe">
          { locals && <Globe /> }
        </section>
        <section className="page-content">
          
          <ul>
            {locals.map((event: LocalEvent) => 
              <ListItem key={event.id} event={event} />
            )}
          </ul>
        </section>
      </main>
    </ReduxProvider>
  )
}