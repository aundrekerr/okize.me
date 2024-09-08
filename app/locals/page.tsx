import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Globe } from "@/app/locals/Globe"
import { TestListItem } from "@/app/locals/test"
import "@/app/locals/locals.css";

export default async function LocalsPage() {
  const activeMarker = useState([0, 0]);
  const localsPromise = async () => (await fetch(process.env.BASE_URL + `/api/locals`)).json();
  const locals = await localsPromise();
  
  return (
    <main className="locals-page">
      <h1>locals</h1>
      {/* {locals && <Globe active={activeMarker} />} */}
      <ul>
        <h5>buh</h5>
        {locals.map((event: LocalEvent) => 
          <TestListItem key={event.id} event={event} />
        )}
      </ul>
      {/* <code>{JSON.stringify(locals.length)}</code> */}
    </main>
  )
}