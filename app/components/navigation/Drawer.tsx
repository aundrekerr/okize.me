"use client";
import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Drawer } from 'vaul';
import { Game, allGames } from "@/app/utils/gamesConfig";

interface IconSizing {
  [key: string]: {
    w: number,
    h: number
  }
}
interface NavItem extends Game {}
interface Props {
  navItems: NavItem[]
  toggleDrawer: Function
  open: boolean
}

const iconSizing: IconSizing = {
  "street-fighter-6": { w: 34, h: 34 },
  "riot2xko": { w: 44, h: 44 }
}

export const NavDrawer = ({ navItems, toggleDrawer, open }: Props) => {
  return (
    // <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer(false)}>
    //   <nav className="okz-drawer">
    //     <div className='flex justify-center items-center bg-black text-zinc-50 p-1 cursor-pointer' onClick={() => toggleDrawer(false)}>
    //       <span className='text-2xl'>×</span>
    //     </div>
    //     <ul className='nav-links'>
    //       {navItems.map((item: NavItem, i: number) => (<li key={item.id}>
    //         <motion.div
    //           initial={{ translateY: 'clamp(3rem, 3rem, 4rem)' }}
    //           animate={{ translateY: 0 }}
    //           transition={{ ease: [0, 0.55, 0.45, 1], duration: 0.5, delay: 0.125 * (i + 0.5) }}
    //         >
    //           <Link onClick={() => toggleDrawer(false)} href={`/${item.slug}`}>
    //             {(item.icon && item.brandFilter) && <Image 
    //               className="mr-4" 
    //               priority 
    //               src={`/games/${item.id}/${item.icon}`} 
    //               alt={`${item.title} Logo`} 
    //               width={iconSizing[item.id as keyof IconSizing].w} 
    //               height={iconSizing[item.id as keyof IconSizing].h} 
    //               style={{filter: item?.brandFilter ? item.brandFilter : 'none'}}
    //             />}
    //             <span data-button={Object.hasOwn(item, 'shorthand') ? item.shorthand : item.title}>
    //               {Object.hasOwn(item, 'shorthand') ? item.shorthand : item.title}
    //             </span>
    //           </Link>
    //         </motion.div>
    //       </li>))}
    //     </ul>
    //   </nav>
    // </Drawer>
    <Drawer.Root>
      <Drawer.Trigger>Open Drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-white">{/* Content */}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}