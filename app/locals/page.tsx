import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';

import { LocalsClient } from "@/app/locals/ClientWrapper"
import { Globe } from "@/app/locals/Globe"


export default async function LocalsPage() {
  const localsPromise = async () => (await fetch(process.env.BASE_URL + `/api/locals`)).json();
  const locals = await localsPromise();
  
  return (
    <LocalsClient locals={locals} />
  )
}