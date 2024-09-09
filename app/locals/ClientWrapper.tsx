"use client";

import ReduxProvider from "@/lib/ReduxProvider";
import { Globe } from "@/app/locals/Globe"
import { ListItem } from "@/app/locals/ListItem"

import "@/app/split-page.css";
import "@/app/locals/locals.css";

export const LocalsClient = ({ locals }: { locals: LocalEvent[] }) => {
  // console.log(subdivisions.find(c => (c.name).includes("Ireland")), locals, countries, countryFlags)
  const localsPromise = async () => (await fetch('https://okize.me' + `/api/locals`)).json();
  

  return (
    <ReduxProvider>
      <main className="split-page locals-page">
        <section className="locked-in-place globe">
          { locals && <Globe /> }
        </section>
        <section className="page-content">
          <a href="#" className="button" onClick={() => console.log(localsPromise())}>test locals</a>
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