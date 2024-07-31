// Brand filter is used because currentColor can't be used on SVGs loaded via img tag.
// Calculated from: https://codepen.io/sosuke/pen/Pjoqqp

const streetFighter6 = {
  title: "Street Fighter 6",
  shorthand: "SF6",
  id: "street-fighter-6",
  slug: "street-fighter-6",
  brand: "#f34c01",
  brandFilter: "brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(2458%) hue-rotate(2deg) brightness(96%) contrast(103%)",
  icon: 'sf6-logo.svg'
};

const riot2XKO = {
  title: "2XKO",
  shorthand: "2XKO",
  id: "riot2xko",
  slug: "2xko",
  brand: "#cdf564",
  brandFilter: "brightness(0) saturate(100%) invert(96%) sepia(53%) saturate(927%) hue-rotate(21deg) brightness(106%) contrast(92%)",
  icon: '2xko-logo-white.svg'
};

export const allGames = () => {
  return [
    streetFighter6,
    riot2XKO,
  ]
}

export const findGame = (game: string) => {
  return allGames().find(g => g.title === game || g.id === game || g.slug === game)
}