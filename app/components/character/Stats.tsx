"use client";
import { useState } from 'react';
import Image from 'next/image'

import styles from '@/app/ui/character/stats.module.css'

interface Props {
  game: string
  stats: any
}

interface Stat {
  name: string
  stat: string
}

const SectionTitle = ({ icon, title }: { icon: string, title: string }) => (
  <div className={styles.sectionTitle}>
    <Image 
      src={`/icons/${icon}.svg`} 
      width={16} 
      height={16} 
      alt={icon}
    />
    <span>{title}</span>
  </div>
)


const StatList = ({ list }: { list: Stat[] }) => {
  const statNameMap = {
    'health': 'Health',
    'fWalk': 'Fwd',
    'bWalk': 'Back',
    'fDash': 'Fwd',
    'bDash': 'Back',
    'fDashDist': 'F. Dist',
    'bDashDist': 'B. Dist',
    'dRushDist': 'Distance', 
    'dRushDistMin': 'Min', 
    'dRushDistMax': 'Max', 
    'nJump': 'Neutral', 
    'fJump': 'Fwd', 
    'bJump': 'Back', 
    'throwRange': 'Range',
    'throwHurt': 'Hurtbox'

  }

  const statName = (name: string) => (statNameMap[name as keyof typeof statNameMap] || name)

  return <ul>
    {list.map((s: Stat, i: number) => <li key={i}>
      <span className={styles.statName}>{statName(s.name)}</span>
      <span className={styles.statValue}>{s.stat}</span>
    </li>)}
  </ul>
}

const SF6Stats = ({ stats }: { stats: any }) => {
  const statFilter = (toFind: string[]) => stats.filter((s: Stat) => toFind.includes(s.name));
  const vitality = ['health'];
  const walk = ['fWalk', 'bWalk'];
  const dash = ['fDash', 'bDash', 'fDashDist', 'bDashDist'];
  const driveRush = ['dRushDist', 'dRushDistMin', 'dRushDistMax'];
  const jump = ['nJump', 'fJump', 'bJump'];
  const grab = ['throwRange', 'throwHurt'];

  return (
    <div className={styles.stats}>
      <div className={styles.statBlock}>
        <SectionTitle icon="heart" title="Vitality" />
        <StatList list={statFilter(vitality)} />
      </div>
      <div className={styles.statBlock}>
        <SectionTitle icon="walk" title="Walk" />
        <StatList list={statFilter(walk)} />
      </div>
      <div className={styles.statBlock}>
        <SectionTitle icon="dash" title="Dash" />
        <StatList list={statFilter(dash)} />
      </div>
      <div className={styles.statBlock}>
        <SectionTitle icon="drive-rush" title="Drive Rush" />
        <StatList list={statFilter(driveRush)} />
      </div>
      <div className={styles.statBlock}>
        <SectionTitle icon="jump" title="Jump" />
        <StatList list={statFilter(jump)} />
      </div>
      <div className={styles.statBlock}>
        <SectionTitle icon="throw" title="Throw" />
        <StatList list={statFilter(grab)} />
      </div>
    </div>
  )
}

const Riot2XKOStats = () => {
  return <div className={styles.stats}>No stats yet.</div>
}

export const Stats = ({ game, stats }: Props) => {
  if (game === 'riot2xko') return <Riot2XKOStats />;
  if (game === 'street-fighter-6') return <SF6Stats stats={stats}/>
  return;
}