type LocalEvent = {
  id: number,
  event_name: string,
  country: string,
  subnational: string,
  metro_area: string,
  venue_name: string,
  venue_address: string,
  last_update: string,
  games: string[],
  socials: {
    discord: string | null,
    email: string | null,
    facebook: string | null,
    instagram: string | null,
    other: string | null,
    twitch: string | null,
    twitch_alt: string | null,
    twitter: string | null,
    youtube: string | null,
  }
}