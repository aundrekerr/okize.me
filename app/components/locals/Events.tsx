"use client"
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setGlobeState, setFilterState } from "@/lib/features/localsSlice";
import { exceptions } from '@/app/locals/config'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { iso31661 as countries, ISO31661Entry, iso31662 as subnationals } from 'iso-3166'
import geocodeData from '@/app/api/(locals)/geocoding/countries.json';

import styles from '@/app/ui/locals/events.module.css'
import { FullEvent } from './FullEvent';
import { current } from '@reduxjs/toolkit';

interface Props {
  data: LocalEvent[]
  geoCountry: any
  currentEvent: LocalEvent | null
  setCurrentEvent: Function
}

export const Events = ({ data, geoCountry, currentEvent, setCurrentEvent }: Props) => {
  const dispatch = useAppDispatch();
  const [filtered, setFiltered] = useState<LocalEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<LocalEvent[]>([])
  const filtersState = useAppSelector((state) => state.locals.filters);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Check against non-standard names from the spreadsheet before getting the ISO object
  const filterBy = (param: string) => {
    const standardFilter = filteredEvents.filter((fe: LocalEvent) => {
      const isException = () => {
        // The value of the exception
        const paramValue = fe[param as keyof typeof filtersState]
        const exceptionIndex = Object.values(exceptions).indexOf(paramValue as string)
        // If we have an exception, use its proper name
        if (exceptionIndex > -1) return Object.keys(exceptions)[exceptionIndex]
        return false;
      }
      // Compare the LocalEvent against the filter 
      if (isException()) return isException() === filtersState[param as keyof typeof filtersState].name
      return fe[param as keyof typeof filtersState] === filtersState[param as keyof typeof filtersState].name
    })

    const alphaSort = standardFilter.sort((a, b) => {
      const numA = parseInt((a.country).match(/frame(\d+)/)?.[1] || "0", 10);
      const numB = parseInt((b.country).match(/frame(\d+)/)?.[1] || "0", 10);
      return numA - numB;
    })

    return alphaSort
  }

  useEffect(() => {
    setFilteredEvents(data)
    // If we have a country from the IP, set it as the initial filter country
    if (geoCountry) {
      const geoCountryISO = countries.find((c: ISO31661Entry) => c.name === geoCountry)
      if (geoCountryISO) {
        dispatch(setFilterState({ country: geoCountryISO }))
      }
    }
  }, [])

  useEffect(() => {
    let toFilter = [] as LocalEvent[]
    // Sort by COUNTRY
    if (filtersState.country) toFilter = filterBy('country')

    // Sort by SUBNATIONAL
    if (filtersState.subnational) toFilter = filterBy('subnational')

    setFiltered(toFilter)
  }, [filtersState])
  
  const handleOnClick = async (event: LocalEvent) => {
    handleOpen();
    setCurrentEvent(event);
    const country = getCountryISO(event.country) as string;
    const subnational = subnationals.find(s => {
      if (s.name === event.subnational) return s;
      if (exceptions[s.name as keyof typeof exceptions] === event.subnational) return s;
      return false;
    })
    
    const matched = Object.entries(geocodeData).find(([key, val]) => {
      let isoCode = country;
      if (!isoCode) return false;
      if (subnational) isoCode = subnational.code;
      if (key === isoCode) return true;
      return false;
    });

    if (matched) {
      const [code, data] = matched;
      let lat = data['lat' as keyof typeof data];
      let lng = data['lng' as keyof typeof data];

      if (!lat || !lng) {
        // Unifnished fallback. Take the ISO code and get the lat/lng of that area rather than 
        // const backup = code.split('-')[0]
        // const backupMatch = Object.entries(geocodeData).find(([key, val]) => key === backup)
        // console.log('backup', backup, backupMatch)
        dispatch(setGlobeState([0, 0]));
      }
      dispatch(setGlobeState([parseInt(lat), parseInt(lng)]));
      return;
    }
  }

  const getCountryISO = (eventCountry: string) => {
    const national = countries.find(c => {
      if ([c.name, c.alpha2, c.alpha3].includes(eventCountry)) return c;
      if (exceptions[c.name as keyof typeof exceptions] === eventCountry) return c;
      return false;
    })
    if (!national) return false;
    return national.alpha2;
  }
  
  return (
    <div className={styles.eventsWrapper}>
      <span className={styles.resultsCount}>{ filtered.length + ' event' + `${filtered.length > 1 || filtered.length === 0 ? 's' : ''}` + ' found' }</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.eventListInfoBox}>
          <FullEvent localEvent={ currentEvent } />
        </Box>
      </Modal>
      <ul className={styles.eventsList}>
        { filtered.map((localEvent: LocalEvent, index: number) => (
          <li key={`${localEvent.id}-${index}`} onClick={() => handleOnClick(localEvent)}>
            <span className={styles.moreArrow}><i /></span>
            <div className={styles.eventListItemLead}>
              <span className={styles.eventListItemName}>{ localEvent.event_name }</span>
              <div className={styles.eventListItemLocation}>
                <span>{ localEvent.subnational && `${ localEvent.subnational }, ` }{ localEvent.country }</span>
                <span>{ localEvent.metro_area }</span>
              </div>
              { localEvent.games && <div className={styles.eventGamesList}>
                <ul>
                  { (localEvent.games).map((game: { slug: string, shorthand: string }) => (
                    <li key={game.slug}>{game.shorthand}</li>
                  )) }
                </ul>
              </div>}
            </div>
          </li>
        )) }
      </ul>
    </div>
  )
}