"use client"
import { useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setFilterState } from "@/lib/features/localsSlice";
import { exceptions } from '@/app/locals/config'

import { ISO31661AssignedEntry } from 'iso-3166/1';
import { iso31662, ISO31662Entry } from 'iso-3166/2';
import { iso31661 as countries, ISO31661Entry, iso31662 as subnationals } from 'iso-3166'

import controlStyles from '@/app/ui/character/controls.module.css'
import styles from '@/app/ui/locals/filters.module.css'

interface Props {
  available: string[]
  geoCountry: any
}

export const Filters = ({ available, geoCountry }: Props) => {
  const dispatch = useAppDispatch();
  // const filtersState = useAppSelector((state) => state.locals.filters);
  const [country, setCountry] = useState<ISO31661Entry | null>(null)
  const [subnational, setSubnational] = useState<ISO31662Entry | null>(null)
  const [sortedSubnationals, setSortedSubnationals] = useState<ISO31662Entry[]>([])

  const sortedCountries = available.map((a: string) => {
    let toFind = a;
    // If this country has a different name in the spreadsheet, find its offical name.
    const exceptionIndex = Object.values(exceptions).indexOf(toFind)
    if (exceptionIndex > -1) {
      const officialName = Object.keys(exceptions)[exceptionIndex]
      toFind = officialName
    }
    // Find official country object
    return countries.find((c: Country) => c.name === toFind)
  })

  useEffect(() => {
    // If we have a country from the IP, set it as the initial filter country
    if (geoCountry) {
      const geoCountryISO = countries.find((c: ISO31661Entry) => c.name === geoCountry)
      if (geoCountryISO) {
        setCountry(geoCountryISO)
        dispatch(setFilterState({ country: geoCountryISO }))
      }
    }
  }, [])

  // Get the country's subnationals when selected
  useEffect(() => {
    setSortedSubnationals(subnationals.filter((s: ISO31662Entry) => { 
      if (!country) return; 
      return country.alpha2 === s.parent 
    }))
  }, [country])

  // Handle the COUNTRY select
  const handleCountry = (data: any) => {
    if (data === undefined) {
      setCountry(null);
      setSubnational(null);
      return;
    }
    const selectedCountry = countries.find((c: ISO31661Entry) => c.name === data.target.value)
    if (!selectedCountry) return;
    setCountry(selectedCountry);
    dispatch(setFilterState({ country: selectedCountry }))
  }

  // Handle the SUBNATIONAL select
  const handleSubnational = (data: any) => {
    if (data === undefined) {
      setSubnational(null);
      return;
    }
    const selectedSubnational = subnationals.find((s: ISO31662Entry) => (s.name === data.target.value && country?.alpha2 === s.parent))
    if (!selectedSubnational) return;
    setSubnational(selectedSubnational);
    dispatch(setFilterState({ subnational: selectedSubnational }))
  }
  
  return (
    <>
      <div className={styles.filtersWrapper}>
        <div className={controlStyles.controlPanel}>
          <span className={`${controlStyles.controlPanelTitle} ${styles.controlPanelTitle}`}>Country</span>
          <select 
            name="country" 
            id="country"
            className={controlStyles.selectField}
            value={country?.name}
            onChange={(e) => handleCountry(e)}
          >
            <option value={ undefined }>---</option>
            {sortedCountries.map((c: ISO31661AssignedEntry | undefined) => c && <option key={c.alpha2} value={c.name}>{ c.name }</option>)}
          </select>
        </div>

        <div className={controlStyles.controlPanel}>
          <span className={`${controlStyles.controlPanelTitle} ${styles.controlPanelTitle}`}>State/Province</span>
          <select 
            name="subnational" 
            id="subnational"
            className={controlStyles.selectField}
            value={subnational?.name}
            onChange={(e) => handleSubnational(e)}
            disabled={country === null}
          >
            <option value={ undefined }>---</option>
            {sortedSubnationals.map((c: ISO31662Entry | undefined, i: number) => c && <option key={`${c.code}-${i}`} value={c.name}>{ c.name }</option>)}
          </select>
        </div>
      </div>
    </>
  )
}