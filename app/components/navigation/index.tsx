"use client";
import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Drawer } from 'vaul';
import { Game, allGames } from "@/app/utils/gamesConfig";
import styles from  "@/app/ui/navigation/navigation.module.css"

interface IconSizing {
  [key: string]: {
    w: number,
    h: number
  }
}

interface NavItem extends Game {}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const games = allGames()
  const iconSizing: IconSizing = {
    "street-fighter-6": { w: 34, h: 34 },
    "riot2xko": { w: 44, h: 44 }
  }
  let navItems = [
    { id: 'home', slug: '', title: 'Home', },
    { id: 'about', slug: 'about', title: 'About', },
    { id: 'locals', slug: 'locals', title: 'Locals', },
  ] as NavItem[];
  navItems = [...navItems, ...games];

  return (
    <>
      <div className={styles.mainNavigation}>
        <div className={styles.navLogo}>
          <Link href="/"><Image src="/icons/okz-white.svg" alt="okize.me logo" width="24" height="24" /></Link>
        </div>
        <Drawer.Root direction='right' open={open} onOpenChange={setOpen}>
          <Drawer.Trigger>
            <div className={styles.burger}>
              <svg viewBox="0 0 100 100">
                <path className={`${styles.line} ${styles.top}`} d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429" />
                <path className={`${styles.line} ${styles.middle}`} d="m 70,50 h -40" />
                <path className={`${styles.line} ${styles.bottom}`} d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429" />
              </svg>
            </div>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content 
              className="right-2 top-2 bottom-2 fixed z-[60] outline-none w-[310px] flex"
              style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
            >
              <div className={styles.navDrawer}>
                <Drawer.Title/>
                <ul>
                  {navItems.map((item: NavItem, i: number) => (<li key={item.id}>
                    <motion.div
                      initial={{ translateY: 'clamp(3rem, 3rem, 4rem)' }}
                      animate={{ translateY: 0 }}
                      transition={{ ease: [0, 0.55, 0.45, 1], duration: 0.5, delay: 0.125 * (i + 0.5) }}
                    >
                      <Link onClick={() => setOpen(false)} href={`/${item.slug}`}>
                        {(item.icon && item.brandFilter) && <Image 
                          className="mr-4" 
                          priority 
                          src={`/games/${item.id}/${item.icon}`} 
                          alt={`${item.title} Logo`} 
                          width={iconSizing[item.id as keyof IconSizing].w} 
                          height={iconSizing[item.id as keyof IconSizing].h} 
                          style={{filter: item?.brandFilter ? item.brandFilter : 'none'}}
                        />}
                        <span data-button={Object.hasOwn(item, 'shorthand') ? item.shorthand : item.title}>
                          {Object.hasOwn(item, 'shorthand') ? item.shorthand : item.title}
                        </span>
                      </Link>
                    </motion.div>
                  </li>))}
                </ul>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  );
};

export default Navbar;