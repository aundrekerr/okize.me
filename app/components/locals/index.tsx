"use client"
import ReduxProvider from "@/lib/ReduxProvider";

import { Wave } from "@/app/components/home/Wave";
import { Globe } from "@/app/components/locals/Globe"
import { Events } from "@/app/components/locals/Events"

import styles from '@/app/ui/locals/locals.module.css'
import pageStyles from '@/app/ui/page/page.module.css'

interface Props {
  data: LocalEvent[]
}

export const Locals = ({ data }: Props) => {
  return (
    <ReduxProvider>
      <main className={pageStyles.pageContainer}>
        <div className={`${pageStyles.pageFirst} ${styles.localsFirst}`}>
          <Globe />
        </div>
        <div className={`${pageStyles.pageSecond} ${styles.localsSecond}`}>
        {/* <div className={`${pageStyles.pageSecond}`}> */}
          <Wave direction="vertical" />
          <div className="w-full block my-20">
            <p>
              FGC locals around the world.<br/>Data sourced from&nbsp;
              <a rel="noopener noreferrer"target="_blank" href="https://twitter.com/ultradavid">UltraDavid</a>&apos;s
              &nbsp;
              <a rel="noopener noreferrer"target="_blank" href="https://docs.google.com/spreadsheets/d/1rJdulqidZY_Cdw1S30aLXMFWzttaelxIKyaK-_uZbuc/">spreadsheet</a>.
            </p>
          </div>

          <Events data={ data } />
        </div>
      </main>
    </ReduxProvider>
  )
}