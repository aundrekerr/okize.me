"use client";
// import Image from "next/image";
import Phrases from "@/app/components/home/Phrases";
import "./okz-home.css"

export default function Home() {

  return (
    <main className="okz-home">
      <div className="flair">
        <Phrases />
      </div>
      <div className="cta">
        <h1>okizeme</h1>
      </div>
    </main>
  );
}
