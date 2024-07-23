"use client";
// import Image from "next/image";
import Phrases from "@/app/components/home/Phrases";
import Wave from "@/app/components/home/Wave";
import "./okz-home.css"

export default function Home() {

  return (
    <main className="okz-home">
      <div className="flair">
        <Phrases />
      </div>
      <div className="cta">
        <Wave direction="vertical" />
        <h1>Under construction.</h1>
      </div>
    </main>
  );
}
