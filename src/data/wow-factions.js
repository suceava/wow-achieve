const WOW_FACTIONS = [
  // Legion
  {
    name: 'Legion',
    factions: [
      {
        name: 'Conjurer Margoss',
        id: 1975
      },
      {
        name: 'Court of Farondis',
        id: 1900
      },
      {
        name: 'Dreamweavers',
        id: 1883
      },
      {
        name: 'Highmountain Tribe',
        id: 1828
      },
      {
        name: 'Illidari',
        id: 1947
      },
      {
        name: 'Jandvik Vrykul',
        id: 1888
      },
      {
        name: 'Moonguard',
        id: 1899
      },
      {
        name: 'Talon\'s Vengeance',
        id: 2018
      },
      {
        name: 'The First Responders',
        id: 1984
      },
      {
        name: 'The Nightfallen',
        id: 1859
      },
      {
        name: 'The Wardens',
        id: 1894
      },
      {
        name: 'Valarjar',
        id: 1948
      }
    ]
  },

  // Warlords of Draenor
  {
    name: 'Warlords of Draenor',
    factions: [
      {
        name: 'Arakkoa Outcasts',
        id: 1515
      },
      {
        name: 'Barracks Bodyguards',
        id: 1735
      },
      {
        name: 'Council of Exarchs',
        id: 1731,
        side: 'alliance'
      },
      {
        name: 'Frostwolf Orcs',
        id: 1445,
        side: 'horde'
      },
      {
        name: 'Hand of the Prophet',
        id: 1847,
        side: 'alliance'
      },
      {
        name: 'Laughing Skull Orcs',
        id: 1708,
        side: 'horde'
      },
      {
        name: 'Order of the Awakened',
        id: 1849
      },
      {
        name: 'Sha\'tari Defense',
        id: 1710,
        side: 'alliance'
      },
      {
        name: 'Shadowmoon Exiles',
        id: 1520
      },
      {
        name: 'Steamwheedle Preservation Society',
        id: 1711
      },
      {
        name: 'The Saberstalkers',
        id: 1850
      },
      {
        name: 'Vol\'jin\'s Headhunters',
        id: 1848,
        side: 'horde'
      },
      {
        name: 'Vol\'jin\'s Spear',
        id: 1681,
        side: 'horde'
      },
      {
        name: 'Wrynn\'s Vanguard',
        id: 1682,
        side: 'alliance'
      }
    ]
  },

  // Mists of Pandaria
  {
    name: 'Mists of Pandaria',
    factions: [
      {
        name: 'Dominance Offensive',
        id: 1375,
        side: 'horde'
      },
      {
        name: 'Golden Lotus',
        id: 1269
      },
      {
        name: 'Kirin Tor Offensive',
        id: 1387,
        side: 'alliance'
      },
      {
        name: 'Operation: Shieldwall',
        id: 1376,
        side: 'alliance'
      },
      {
        name: 'Order of the Cloud Serpent',
        id: 1271
      },
      {
        name: 'Shado-Pan',
        id: 1270
      },
      {
        name: 'Shado-Pan Assault',
        id: 1435
      },
      {
        name: 'Shang Xi\'s Accademy',
        id: 1216
      },
      {
        name: 'Sunreaver Onslaught',
        id: 1388,
        side: 'horde'
      },
      {
        name: 'The August Celestials',
        id: 1341
      },
      {
        name: 'The Black Prince',
        id: 1359
      },
      {
        name: 'The Klaxxi',
        id: 1337
      },
      {
        name: 'The Lorewalkers',
        id: 1345
      },
      {
        name: 'The Anglers',
        id: 1302,
        factions: [
          {
            name: 'Nat Pagle',
            id: 1358
          }
        ]
      },
      {
        name: 'The Tillers',
        id: 1272,
        factions: [
          {
            name: 'Chee Chee',
            id: 1277
          },
          {
            name: 'Ella',
            id: 1275
          },
          {
            name: 'Farmer Fung',
            id: 1283
          },
          {
            name: 'Fish Fellreed',
            id: 1282
          },
          {
            name: 'Gina Mudclaw',
            id: 1281
          },
          {
            name: 'Haohan Mudclaw',
            id: 1279
          },
          {
            name: 'Jogu the Drunk',
            id: 1273
          },
          {
            name: 'Old Hillpaw',
            id: 1276
          },
          {
            name: 'Sho',
            id: 1278
          },
          {
            name: 'Tina Mudclaw',
            id: 1280
          }
        ]
      }
    ]
  },

  // Cataclysm
  {
    name: 'Cataclysm',
    factions: [
      {
        name: 'Avengers of Hyjal',
        id: 1204
      },
      {
        name: 'Baradin\'s Wardens',
        id: 1177,
        side: 'alliance'
      },
      {
        name: 'Dragonmaw Clan',
        id: 1172,
        side: 'horde'
      },
      {
        name: 'Guardians of Hyjal',
        id: 1158
      },
      {
        name: 'Hellscream\'s Reach',
        id: 1178,
        side: 'horde'
      },
      {
        name: 'Ramkahen',
        id: 1173
      },
      {
        name: 'The Earthen Ring',
        id: 1135
      },
      {
        name: 'Therazane',
        id: 1171
      },
      {
        name: 'Wildhammer Clan',
        id: 1174,
        side: 'alliance'
      }
    ]
  },

  // Wrath of the Lich King
  {
    name: 'Wrath of the Lich King',
    factions: [
      {
        name: 'Argent Crusade',
        id: 1106
      },
      {
        name: 'Kirin Tor',
        id: 1090
      },
      {
        name: 'Knights of the Ebon Blade',
        id: 1098
      },
      {
        name: 'The Ashen Verdict',
        id: 1156
      },
      {
        name: 'The Kalu\'ak',
        id: 1073
      },
      {
        name: 'The Sons of Hodir',
        id: 1119
      },
      {
        name: 'The Wyrmrest Accord',
        id: 1091
      },
      {
        name: 'Alliance Vanguard',
        id: 1037,
        side: 'alliance',
        factions: [
          {
            name: 'Explorer\' League',
            id: 1068,
            side: 'alliance'
          },
          {
            name: 'The Frostborn',
            id: 1126,
            side: 'alliance'
          },
          {
            name: 'The Silver Covenant',
            id: 1094,
            side: 'alliance'
          },
          {
            name: 'Valiance Expedition',
            id: 1050,
            side: 'alliance'
          }
        ]
      },
      {
        name: 'Horde Expedition',
        id: 1052,
        side: 'horde',
        factions: [
          {
            name: 'The Hand of Vengeance',
            id: 1067,
            side: 'horde'
          },
          {
            name: 'The Sunreavers',
            id: 1124,
            side: 'horde'
          },
          {
            name: 'The Taunka',
            id: 1064,
            side: 'horde'
          },
          {
            name: 'Warsong Offensive',
            id: 1085,
            side: 'horde'
          }
        ]
      },
      {
        name: 'Sholazar Basin',
        factions: [
          {
            name: 'Frenzyheart Tribe',
            id: 1104
          },
          {
            name: 'The Oracles',
            id: 1105
          }
        ]
      }
    ]
  },

  // The Burning Crusade
  {
    name: 'The Burning Crusade',
    factions: [
      {
        name: 'Ashtongue Deathsworm',
        id: 1012
      },
      {
        name: 'Cenarion Expedition',
        id: 942
      },
      {
        name: 'Honor Hold',
        id: 946,
        side: 'alliance'
      },
      {
        name: 'Keepers of Time',
        id: 989
      },
      {
        name: 'Kurenai',
        id: 978,
        side: 'alliance'
      },
      {
        name: 'Netherwing',
        id: 1015
      },
      {
        name: 'Ogri\'la',
        id: 1038
      },
      {
        name: 'Sporeggar',
        id: 970
      },
      {
        name: 'The Consortium',
        id: 933
      },
      {
        name: 'The Mag\'har',
        id: 941,
        side: 'horde'
      },
      {
        name: 'The Scale of the Sands',
        id: 990
      },
      {
        name: 'The Violet Eye',
        id: 967
      },
      {
        name: 'Thrallmar',
        id: 947,
        side: 'horde'
      },
      {
        name: 'Tranquillien',
        id: 922,
        side: 'horde'
      },
      {
        name: 'Shattrath City',
        factions: [
          {
            name: 'Lower City',
            id: 1011
          },
          {
            name: 'Sha\'tari Skyguard',
            id: 1031
          },
          {
            name: 'Shattered Sun Offensive',
            id: 1077
          },
          {
            name: 'The Aldor',
            id: 932
          },
          {
            name: 'The Scryers',
            id: 934
          },
          {
            name: 'The Sha\'tar',
            id: 935
          }
        ]
      }
    ]
  },

  // Classic
  {
    name: 'Classic',
    factions: [
      {
        name: 'Argent Dawn',
        id: 529
      },
      {
        name: 'Bloodsail Buccaneers',
        id: 87
      },
      {
        name: 'Brood of Nozdormu',
        id: 910
      },
      {
        name: 'Cenarion Circle',
        id: 609
      },
      {
        name: 'Darkmoon Faire',
        id: 909
      },
      {
        name: 'Gelkis Clan Centaur',
        id: 92
      },
      {
        name: 'Hydraxian Waterlords',
        id: 749
      },
      {
        name: 'Magram Clan Centaur',
        id: 93
      },
      {
        name: 'Ravenholdt',
        id: 349
      },
      {
        name: 'Shen\'dralar',
        id: 809
      },
      {
        name: 'Syndicate',
        id: 70
      },
      {
        name: 'Thorium Brotherhood',
        id: 59
      },
      {
        name: 'Timbermaw Hold',
        id: 576
      },
      {
        name: 'Wintersaber Trainers',
        id: 589
      },
      {
        name: 'Zandalar Tribe',
        id: 270
      },
      {
        name: 'Alliance',
        side: 'alliance',
        factions: [
          {
            name: 'Darnassus',
            id: 69,
            side: 'alliance'
          },
          {
            name: 'Exodar',
            id: 930,
            side: 'alliance'
          },
          {
            name: 'Gilneas',
            id: 1134,
            side: 'alliance'
          },
          {
            name: 'Gnomeregan',
            id: 54,
            side: 'alliance'
          },
          {
            name: 'Ironforge',
            id: 47,
            side: 'alliance'
          },
          {
            name: 'Stormwind',
            id: 72,
            side: 'alliance'
          }          
        ]
      },
      {
        name: 'Alliance Forces',
        side: 'alliance',
        factions: [
          {
            name: 'Bizmo\'s Brawlpub',
            id: 2011,
            side: 'alliance'
          },
          {
            name: 'Bizmo\'s Brawlpub (Season 2)',
            id: 1691,
            side: 'alliance'
          },
          {
            name: 'Silverwing Sentinels',
            id: 890,
            side: 'alliance'
          },
          {
            name: 'Stormpike Guard',
            id: 730,
            side: 'alliance'
          },
          {
            name: 'The League of Arathor',
            id: 509,
            side: 'alliance'
          }          
        ]
      },
      {
        name: 'Horde',
        side: 'horde',
        factions: [
          {
            name: 'Bilgewater Cartel',
            id: 1133,
            side: 'horde'
          },
          {
            name: 'Darkspear Trolls',
            id: 530,
            side: 'horde'
          },
          {
            name: 'Orgrimmar',
            id: 76,
            side: 'horde'
          },
          {
            name: 'Silvermoon City',
            id: 911,
            side: 'horde'
          },
          {
            name: 'Thunder Bluff',
            id: 81,
            side: 'horde'
          },
          {
            name: 'Undercity',
            id: 68,
            side: 'horde'
          }
        ]
      },
      {
        name: 'Horde Forces',
        side: 'horde',
        factions: [
          {
            name: 'Brawl\'gar Arena',
            id: 2010,
            side: 'horde'
          },
          {
            name: 'Brawl\'gar Arena (Season 2)',
            id: 1690,
            side: 'horde'
          },
          {
            name: 'Frostwolf Clan',
            id: 729,
            side: 'horde'
          },
          {
            name: 'The Defilers',
            id: 510,
            side: 'horde'
          },
          {
            name: 'Warsong Outriders',
            id: 889,
            side: 'horde'
          }
        ]
      },
      {
        name: 'Steamwheedle Cartel',
        factions: [
          {
            name: 'Booty Bay',
            id: 21
          },
          {
            name: 'Everlook',
            id: 577
          },
          {
            name: 'Gadgetzan',
            id: 369
          },
          {
            name: 'Ratchet',
            id: 470
          }          
        ]
      }
    ]
  },

  // Guild
  {
    name: 'Guild',
    factions: [
      {
        name: '',
        id: 1168
      }
    ]
  }
]
export default WOW_FACTIONS;