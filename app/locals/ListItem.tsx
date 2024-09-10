"use client";
import Link from "next/link";
import Image from 'next/image';
import { setCoordState } from "@/lib/features/globeCoordsSlice";
import { useAppDispatch } from "@/lib/store";

import { iso31661 as countries, iso31662 as subdivisions } from 'iso-3166'
import geocodeData from '@/app/api/(locals)/geocoding/countries.json';

export const ListItem = ({ event }: { event: LocalEvent }) => {
  const dispatch = useAppDispatch();
  // A list of countries named differently on the spreadsheet from their official counterparts.
  // Definitely 0 issues if two places are using the same abbreviation from the spreadsheet.
  const exceptions = {
    // Countries
    "Bolivia (Plurinational State of)": "Bolivia",
    "Netherlands, Kingdom of the": "Netherlands",
    "Russian Federation": "Russia",
    "Türkiye": "Turkey",
    "United Arab Emirates": "UAE",
    "United Kingdom of Great Britain and Northern Ireland": "UK",
    "Venezuela (Bolivarian Republic of)": "Venezuela",

    // Subdivisions
    // - Australia
    "Australian Capital Territory": "ACT",
    // - Canada
    "Newfoundland and Labrador": "NL",
    "Prince Edward Island": "PEI",
    // - USA
    "District of Columbia": "DC",
  };
  
  const handleOnClick = async (event: LocalEvent) => {
    const country = getCountryISO(event.country) as string;
    const subnational = subdivisions.find(s => {
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
        // Unifnished
        // const backup = code.split('-')[0]
        // const backupMatch = Object.entries(geocodeData).find(([key, val]) => key === backup)
        // console.log('backup', backup, backupMatch)
        dispatch(setCoordState([0, 0]));
      }
      dispatch(setCoordState([parseInt(lat), parseInt(lng)]));
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
    <li key={event.id} onClick={() => handleOnClick(event)}>
      {getCountryISO(event.country) && <Image 
        width="30"
        height="20"
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryISO(event.country)}.svg`}
        alt=""
      />}
      {event.country} - {event.event_name}
      <br/>
      {event.venue_address}
    </li>
  )
}