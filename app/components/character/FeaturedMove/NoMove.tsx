"use client";
import { useState } from 'react';

import styles from '@/app/ui/character/featured-move/no-move.module.css'

interface Props {
  
}

export const NoMove = ({  }: Props) => {

  return (
    <div className={styles.noMoveWrapper}>
      <div className={styles.noMove}>
        <span>No move selected.</span>
      </div>
    </div>
  )
}