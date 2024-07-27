export const routeRewrites = () => {
  const sf6Path = "/street-fighter-6"
  const sf6Map = {
    "AKI": ["aki", "a.k.i", "a.k.i.", "A.K.I", "A.K.I."],
    "Akuma": ["akuma", "Gouki", "gouki", "Demon", "demon"],
    "Blanka": ["blanka"],
    "Cammy": ["cammy"],
    "ChunLi": ["chunli", "Chunli", "Chun-Li", "chun-li"],
    "DeeJay": ["deejay", "dee-jay", "Dee-Jay", "Dee Jay"],
    "Dhalsim": ["dhalsim"],
    "Ed": ["ed"],
    "EHonda": ["ehonda", "E.Honda", "e-honda", "E-Honda"] ,
    "Elena": ["elena"],
    "Guile": ["gweelay", "Gweelay"],
    "Jamie": ["jamie"],
    "JP": ["jp"],
    "Juri": ["juri"],
    "Ken": ["ken"],
    "Kimberly": ["kimberly", "kim", "Kim"],
    "Lily": ["lily"],
    "Luke": ["luke"],
    "Mai": ["mai"],
    "Manon": ["manon"],
    "Marisa": ["marisa"],
    "MBison": ["mbison", "M.Bison", "m-bison", "M-Bison", "dictator", "Dictator"],
    "Rashid": ["rashid"],
    "Ryu": ["ryu"],
    "Terry": ["terry"],
    "Zangief": ["zangief", "gief", "Gief"],
  }

  const sf6Rewrites = [];
  Object.entries(sf6Map).forEach(([destination, aliases]) => {
    const characterRewrites = aliases.map(val => ({source: `${sf6Path}/${val}`, destination: `${sf6Path}/${destination}`}))
    sf6Rewrites.push(...characterRewrites)
  })

  return [
    ...sf6Rewrites
  ]
}