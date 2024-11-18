"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';

import styles from '@/app/ui/locals/full-event.module.css'

interface Props {
  localEvent: LocalEvent | null
}

export const FullEvent = ({ localEvent }: Props) => {
  console.log(localEvent)

  const socialIcon = (social: string) => {
    return social.includes('_alt') 
      ? social.replace('_alt', '')
      : social
  }

  const socialLink = (social: string) => {
    const linkMap = {
      discord: "https://discord.gg",
      email: "",
      facebook: "",
      instagram: "",
      other: "",
      twitch: "",
      twitch_alt: "",
      twitter: "",
      youtube: "",
    }
  }

  return localEvent && (
    <div className={styles.fullEventContainer}>
      <h2 className={styles.eventName}>{ localEvent.event_name }</h2>
      <div className={styles.location}>
        <span>
          { localEvent.metro_area && `${ localEvent.metro_area }, ` }
          { localEvent.subnational && `${ localEvent.subnational }, `}
          { localEvent.country }
        </span>
      </div>
      { localEvent.games && <div className={styles.gamesList}>
        <ul>
          { (localEvent.games).map((game: { slug: string, shorthand: string }) => (
            <li key={game.slug}>{game.shorthand}</li>
          )) }
        </ul>
      </div>}
      { Object.values(localEvent.socials) && <div className={styles.gamesList}>
        <ul>
          { Object.entries(localEvent.socials).map(([key, val]) => {
            return val && <li key={key}><Image src={`/icons/${socialIcon(key)}.svg`} width={16} height={16} alt={`${key} icon`} />{ val }</li>
          }) }
        </ul>
      </div>}
      <div className={styles.lastUpdate}>
        <span>Last Updated:</span>
        <span>{ localEvent.last_update }</span>
      </div>
    </div>
  )
}