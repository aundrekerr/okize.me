"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Drawer } from 'vaul';

import { Roster } from '@/app/components/game/Roster'
import { Stats } from '@/app/components/character/Stats'
import { Overview } from '@/app/components/character/Overview'

import headerStyles from '@/app/ui/character/header.module.css'
import displayNameStyles from '@/app/ui/character/display-name.module.css'

interface Props {
  config: any
  game: string
  slug: string
  characters: { name: string, slug: string }[]
  stats: any
}

export const Header = ({ config, game, slug, characters, stats }: Props) => {
  const portraitPath = `/games/street-fighter-6/character-assets/${slug}/portrait.png`;
  const [showCharSelect, setShowCharSelect] = useState(false);
  const [activeHeaderPanel, setActiveHeaderPanel] = useState('stats');

  return (
    <section className={headerStyles.header}>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
        <Drawer.Root direction='left' open={showCharSelect} onOpenChange={setShowCharSelect}>
          <Drawer.Trigger className='flex-shrink-0 self-start'>
            <div className={displayNameStyles.displayName}>
              <div className='portrait box-corners'>
                <Image src={portraitPath} alt="" width={96} height={96} />
              </div>
              <h1>{config.name}</h1>
            </div>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content
              className="left-0 lg:left-2 top-2 bottom-2 fixed z-[60] outline-none w-[310px] lg:w-auto flex"
              style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
            >
              <Drawer.Title />
              <div className={headerStyles.rosterWrapper}>
                <Roster game="street-fighter-6" characters={characters} />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>

        <div className={headerStyles.statsOverviewWrapper}>
          <a onClick={() => setActiveHeaderPanel('stats')} className={`${activeHeaderPanel === 'stats' ? 'text-white' : 'text-zinc-700'} border-r border-zinc-700`}>
            <span>Stats</span>
          </a>

          <div className={headerStyles.panelWrapper}>
            <div className={`${(activeHeaderPanel === 'stats' ? headerStyles.opened : headerStyles.closed)} ${headerStyles.headerPanel}`}>
              <div className={`styled-scrollbar p-2 ${activeHeaderPanel === 'stats' ? 'overflow-auto' : 'overflow-hidden'}`}>
                <Stats stats={stats} />
              </div>
            </div>
            <div className={`${(activeHeaderPanel === 'overview' ? headerStyles.opened : headerStyles.closed)} ${headerStyles.headerPanel}`}>
              <div className={`styled-scrollbar p-2 ${activeHeaderPanel === 'overview' ? 'overflow-auto' : 'overflow-hidden'}`}>
                <Overview />
              </div>
            </div>
          </div>

          <a onClick={() => setActiveHeaderPanel('overview')} className={`${activeHeaderPanel === 'overview' ? 'text-white' : 'text-zinc-700'} border-l border-zinc-700`}>
            <span>Overview</span>
          </a>
        </div>
      </div>
    </section>
  )
}