export default function config () {
  return ({
    "AKI": {
      "name": "A.K.I",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 24 },
          { "Special Moves": 31 },
          { "Super Arts": 56 },
          { "": 68 },
        ],
      }
    },
    "Akuma": {
      "name": "Akuma",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 27 },
          { "Special Moves": 34 },
          { "Super Arts": 78 },
          { "": 90 },
        ],
      }
    },
    "Blanka": {
      "name": "Blanka",
      "installs": {
        "base": "Normal",
        "lightning-beast": "Lightning Beast",
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 19 },
          { "Common Moves": 29 },
          { "Special Moves": 37 },
          { "Super Arts": 61 },
          { "": 68 },
        ],
        "lightning-beast": [
          { "Special Moves": 0 },
          { "Super Arts": 17 },
          { "": 68 },
        ],
      }
    },
    "Cammy": {
      "name": "Cammy",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 23 },
          { "Special Moves": 31 },
          { "Super Arts": 65 },
          { "": 70 },
        ],
      }
    },
    "ChunLi": {
      "name": "Chun-Li",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 19 },
          { "Common Moves": 34 },
          { "Special Moves": 42 },
          { "Super Arts": 67 },
          { "": 72 },
        ],
      }
    },
    "DeeJay": {
      "name": "Dee Jay",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 30 },
          { "Special Moves": 37 },
          { "Super Arts": 65 },
          { "": 73 },
        ],
      }
    },
    "Dhalsim": {
      "name": "Dhalsim",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 30 },
          { "Special Moves": 38 },
          { "Super Arts": 57 },
          { "": 80 },
        ],
      }
    },
    "Ed": {
      "name": "Ed",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 27 },
          { "Special Moves": 34 },
          { "Super Arts": 57 },
          { "": 68 },
        ],
      }
    },
    "EHonda": {
      "name": "E. Honda",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 19 },
          { "Common Moves": 24 },
          { "Special Moves": 31 },
          { "Super Arts": 57 },
          { "": 68 },
        ],
      }
    },
    "Elena": {
      "unreleased": true,
      "name": "Elena",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 25 },
          { "Special Moves": 32 },
          { "Super Arts": 65 },
          { "": 68 },
        ],
      }
    },
    "Guile": {
      "name": "Guile",
      "installs": {
        "base": "Normal",
        "solid-puncher": "Solid Puncher"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 29 },
          { "Special Moves": 38 },
          { "Super Arts": 54 },
          { "": 68 },
        ],
        "solid-puncher": [
          { "Special Moves": 0 },
          { "": 4 },
        ],
      }
    },
    "Jamie": {
      "name": "Jamie",
      "installs": {
        "base": "Drink Level 0",
        "drink1": "Drink Level 1",
        "drink2": "Drink Level 2",
        "drink3": "Drink Level 3",
        "drink4": "Drink Level 4",
      },
      "categories": {
        // The indices (+1 because of the source data) 
        // of where these moves end in the movelist for this state.
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 25 },
          { "Special Moves": 32 },
          { "Super Arts": 65 },
          { "": 68 },
        ],
        "drink1": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 27 },
          { "Special Moves": 31 },
          { "Super Arts": 61 },
          { "": 64 },
        ],
        "drink2": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 29 },
          { "Special Moves": 33 },
          { "Super Arts": 67 },
          { "": 70 },
        ],
        "drink3": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 31 },
          { "Special Moves": 35 },
          { "Super Arts": 71 },
          { "": 77 },
        ],
        "drink4": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 35 },
          { "Special Moves": 39 },
          { "Super Arts": 79 },
          { "": 84 },
        ],
      },
    },
    "JP": {
      "name": "JP",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 26 },
          { "Special Moves": 34 },
          { "Super Arts": 56 },
          { "": 68 },
        ],
      }
    },
    "Juri": {
      "name": "Juri",
      "installs": {
        "base": "Normal",
        "feng-shui-engine": "Feng Shui Engine"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 19 },
          { "Common Moves": 25 },
          { "Special Moves": 33 },
          { "Super Arts": 54 },
          { "": 68 },
        ],
        "feng-shui-engine": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 25 },
          { "Special Moves": 32 },
          { "Super Arts": 65 },
          { "": 68 },
        ],
      }
    },
    "Ken": {
      "name": "Ken",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 19 },
          { "Common Moves": 22 },
          { "Special Moves": 29 },
          { "Super Arts": 67 },
          { "": 80 },
        ],
      }
    },
    "Kimberly": {
      "name": "Kimberly",
      "installs": {
        "base": "Normal",
        "bushin-ninjastar": "Bushin Ninjastar (Level 3 Buff)"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 32 },
          { "Special Moves": 39 },
          { "Super Arts": 73 },
          { "": 80 },
        ],
        "bushin-ninjastar": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 29 },
          { "Special Moves": 33 },
          { "Super Arts": 59 },
          { "": 80 },
        ],
      }
    },
    "Lily": {
      "name": "Lily",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 25 },
          { "Special Moves": 32 },
          { "Super Arts": 63 },
          { "": 68 },
        ],
      }
    },
    "Luke": {
      "name": "Luke",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 29 },
          { "Special Moves": 36 },
          { "Super Arts": 63 },
          { "": 68 },
        ],
      }
    },
    "Mai": {
      "unreleased": true,
      "name": "Mai",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 25 },
          { "Special Moves": 32 },
          { "Super Arts": 65 },
          { "": 68 },
        ],
      }
    },
    "Manon": {
      "name": "Manon",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 25 },
          { "Special Moves": 32 },
          { "Super Arts": 52 },
          { "": 68 },
        ],
      }
    },
    "Marisa": {
      "name": "Marisa",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 8 },
          { "Jumping Normals": 16 },
          { "Command Normals": 24 },
          { "Common Moves": 41 },
          { "Special Moves": 48 },
          { "Super Arts": 80 },
          { "": 86 },
        ],
      }
    },
    "MBison": {
      "name": "M. Bison",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 24 },
          { "Special Moves": 31 },
          { "Super Arts": 61 },
          { "": 68 },
        ],
      }
    },
    "Rashid": {
      "name": "Rashid",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 31 },
          { "Special Moves": 39 },
          { "Super Arts": 71 },
          { "": 80 },
        ],
      }
    },
    "Ryu": {
      "name": "Ryu",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 26 },
          { "Special Moves": 33 },
          { "Super Arts": 60 },
          { "": 68 },
        ],
      }
    },
    "Terry": {
      "name": "Terry",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 6 },
          { "Jumping Normals": 12 },
          { "Command Normals": 18 },
          { "Common Moves": 26 },
          { "Special Moves": 33 },
          { "Super Arts": 54 },
          { "": 68 },
        ],
      }
    },
    "Zangief": {
      "name": "Zangief",
      "installs": {
        "base": "Normal"
      },
      "categories": {
        "base": [
          { "Standing Normals": 0 },
          { "Crouching Normals": 7 },
          { "Jumping Normals": 13 },
          { "Command Normals": 20 },
          { "Common Moves": 32 },
          { "Special Moves": 43 },
          { "Super Arts": 58 },
          { "": 68 },
        ],
      }
    },
  })
}