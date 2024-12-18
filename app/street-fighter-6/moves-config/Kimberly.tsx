const data = {
  "base": {
    "Stand LP": [{c:4}, {hap:2}, {pc:8}],
    "Stand MP": [{c:5}, {hap:3}, {pc:18}],
    "Stand HP": [{c:8}, {hap:3}, {pc:20}],
    "Stand LK": [{c:4}, {hap:3}, {pc:11}],
    "Stand MK": [{c:7}, {hap:3}, {pc:18}],
    "Stand HK": [{c:11}, {hap:4}, {pc:17}],
    "Crouch LP": [{c:3}, {hap:4}, {pc:7}],
    "Crouch MP": [{c:5}, {hap:3}, {pc:13}],
    "Crouch HP": [{c:7}, {hap:6}, {pc:17}],
    "Crouch LK": [{c:4}, {hap:3}, {pc:7}],
    "Crouch MK": [{c:6}, {hap:3}, {pc:16}],
    "Crouch HK": [{c:7}, {hap:3}, {pc:24}],
    "Jump LP": [{c:3}, {hap:10}],
    "Jump MP": [{c:5}, {hap:4}],
    "Jump HP": [{c:7}, {hap:5}],
    "Jump LK": [{c:4}, {hap:10}],
    "Jump MK": [{c:6}, {hap:6}],
    "Jump HK": [{c:8}, {hap:6}],
    "Elbow Drop": [{c:12}, {hap:13}],
    "Water Slicer Slide": [{c:10}, {hap:10}, {pc:16}],
    "Windmill Kick": [{c:21}, {hap:2}, {pc:19}],
    "Hisen Kick": [{c:26}, {hap:3}, {pc:21}],
    "Step Up (neutral hop)": [{c:26}, {hap:2}, {c:30}, {pc:3}],
    "Step Up (forward hop)": [{c:26}, {hap:2}, {c:30}, {pc:3}],
    "Step Up (backward hop)": [{c:26}, {hap:2}, {c:30}, {pc:3}],
    "Bushin Prism Strikes 1": [{c:4}, {hap:2}, {c:5}, {hap:3}, {pc:18}],
    "Bushin Prism Strikes 2": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:11}, {hap:2}, {pc:25}],
    "Bushin Prism Strikes 3": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:11}, {hap:2}, {pc:25}, {hap:3}, {pc:24}],
    "Bushin Hellchain 1": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:9}, {hap:2}, {pc:25}],
    "Bushin Hellchain 2": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:9}, {hap:1}, {c:14}, {hap:3}, {pc:24}],
    "Bushin Hellchain Throw": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:9}, {hap:1}, {c:14}, {hap:1}, {ip:66}],
    "Bushin Tiger Fangs": [{c:5}, {hap:1}, {c:9}, {hap:3}, {pc:26}],
    "Ripcord Throw": [{c:4}, {hap:3}, {pc:23}],
    "Bell Ringer": [{c:4}, {hap:3}, {pc:23}],
    "Drive Impact: Steadfast Strike": [{pcat:25}, {hap:2}, {pc:35}],
    "Drive Reversal: Shapeless State": [{ip:19}, {hap:5}, {pc:31}],
    "Drive Parry": [{pcat:12}, {pc:33}],
    "Drive Rush": [{c:45}],
    "Taunt": [],
    "LK Bushin Senpukyaku": [{c:5}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:8}, {hap:3}, {pc:23}],
    "MK Bushin Senpukyaku": [{c:6}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:8}, {hap:3}, {pc:25}],
    "HK Bushin Senpukyaku": [{c:6}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:8}, {hap:3}, {pc:23}],
    "OD Bushin Senpukyaku": [{c:5}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:2}, {pc:23}],
    "Aerial Bushin Senpukyaku": [{c:7}, {hap:2}, {pc:7}, {hap:2}, {pc:7}, {hap:2}, {pc:12}],
    "OD Aerial Bushin Senpukyaku": [{c:7}, {hap:2}, {pc:2}, {hap:3}, {pc:2}, {hap:2}, {pc:2}, {hap:3}, {pc:2}, {hap:2}, {pc:12}],
    "LP Vagabond Edge": [{c:9}, {hap:3}, {pc:21}],
    "MP Vagabond Edge": [{c:16}, {hap:2}, {pc:28}],
    "HP Vagabond Edge": [{c:23}, {hap:2}, {pc:28}],
    "OD Vagabond Edge": [{c:16}, {hap:2}, {pc:28}],
    "Sprint": [{c:8}],
    "OD Sprint": [{c:6}],
    "Sprint > Torso Cleaver": [{c:21}, {hap:7}, {pc:16}],
    "Sprint > Shadow Slide": [{c:17}, {hap:12}, {pc:19}],
    "Sprint > Neck Hunter": [{c:26}, {hap:5}, {pc:19}],
    "Sprint > Emergency Stop": [{c:22}],
    "Sprint > Arc Step": [{c:22}, {hap:2}, {c:6}, {hap:2}, {pc:30}],
    "Arc Step > Bushin Hojin Kick": [{c:22}, {hap:2}, {c:6}, {hap:2}, {pc:18}, {c:12}, {hap:6}, {pc:20}],
    "Arc Step > Bushin Izuna Otoshi": [{c:22}, {hap:2}, {c:6}, {hap:2}, {pc:18}, {c:12}, {hap:6}, {pc:40}],
    "OD Sprint > Torso Cleaver": [{c:24}, {hap:7}, {pc:16}],
    "OD Sprint > Shadow Slide": [{c:15}, {hap:12}, {pc:19}],
    "OD Sprint > Neck Hunter": [{c:23}, {hap:5}, {pc:19}],
    "OD Sprint > Emergency Stop": [{c:21}],
    "OD Sprint > Arc Step": [{c:20}, {hap:2}, {c:6}, {hap:2}, {pc:30}],
    "OD Arc Step > Bushin Hojin Kick": [{c:20}, {hap:2}, {c:6}, {hap:2}, {pc:18}, {c:12}, {hap:3}, {c:13}, {hap:3}, {pc:12}],
    "OD Arc Step > Bushin Izuna Otoshi": [{c:20}, {hap:2}, {c:6}, {hap:2}, {pc:18}, {c:12}, {hap:6}, {pc:40}],
    "Hidden Variable": [{c:18}, {ip:8}, {pc:17}],
    "OD Hidden Variable": [{c:18}, {ip:8}, {pc:19}],
    "Genius at Play": [{c:44}],
    "OD Genius at Play": [{c:44}],
    "Shuriken Bomb": [{c:44}],
    "Shuriken Bomb Spread": [{c:44}],
    "Nue Twister": [{c:4}, {hap:3}],
    "OD Nue Twister": [{c:4}, {hap:3}],
    "Bushin Beats (0 stock)": [{sip:9}, {hap:3}, {pc:40}],
    "Bushin Beats (1 stock)": [{sip:9}, {hap:3}, {pc:40}],
    "Bushin Scramble": [{c:12}, {hap:8}, {pc:39}],
    "Soaring Bushin Scramble (air)": [{c:12}, {hap:9}, {pc:39}],
    "Bushin Ninjastar Cypher": [{ip:7}, {hap:8}, {pc:51}],
    "Bushin Ninjastar Cypher (Critical Art)": [{ip:7}, {hap:8}, {pc:51}]
  },
  "bushin-ninjastar": {
    "Stand LP": [{c:4}, {hap:2}, {pc:8}],
    "Stand MP": [{c:5}, {hap:3}, {pc:18}],
    "Stand HP": [{c:3}, {hap:3}, {pc:20}],
    "Stand LK": [{c:4}, {hap:3}, {pc:11}],
    "Stand MK": [{c:7}, {hap:3}, {pc:18}],
    "Stand HK": [{c:11}, {hap:4}, {pc:17}],
    "Crouch LP": [{c:3}, {hap:4}, {pc:7}],
    "Crouch MP": [{c:5}, {hap:3}, {pc:13}],
    "Crouch HP": [{c:7}, {hap:6}, {pc:17}],
    "Crouch LK": [{c:4}, {hap:3}, {pc:7}],
    "Crouch MK": [{c:6}, {hap:3}, {pc:16}],
    "Crouch HK": [{c:7}, {hap:3}, {pc:24}],
    "Jump LP": [{c:3}, {hap:10}],
    "Jump MP": [{c:5}, {hap:4}],
    "Jump HP": [{c:7}, {hap:5}],
    "Jump LK": [{c:4}, {hap:10}],
    "Jump MK": [{c:6}, {hap:6}],
    "Jump HK": [{c:8}, {hap:6}],
    "Elbow Drop": [{c:12}, {hap:13}],
    "Water Slicer Slide": [{c:10}, {hap:10}, {pc:16}],
    "Windmill Kick": [{c:21}, {hap:2}, {pc:19}],
    "Hisen Kick": [{c:26}, {hap:3}, {pc:21}],
    "Step Up (neutral hop)": [{c:26}, {hap:2}, {c:30}, {pc:3}],
    "Step Up (forward hop)": [{c:26}, {hap:2}, {c:30}, {pc:3}],
    "Step Up (backward hop)": [{c:26}, {hap:2}, {c:30}, {pc:3}],
    "Bushin Prism Strikes 1": [{c:4}, {hap:2}, {c:5}, {hap:3}, {pc:18}],
    "Bushin Prism Strikes 2": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:11}, {hap:2}, {pc:25}],
    "Bushin Prism Strikes 3": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:11}, {hap:2}, {pc:25}, {hap:3}, {pc:24}],
    "Bushin Hellchain 1": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:9}, {hap:2}, {pc:25}],
    "Bushin Hellchain 2": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:9}, {hap:1}, {c:14}, {hap:3}, {pc:24}],
    "Bushin Hellchain Throw": [{c:4}, {hap:2}, {c:5}, {hap:2}, {c:9}, {hap:1}, {c:14}, {hap:1}, {ip:66}],
    "Bushin Tiger Fangs": [{c:5}, {hap:1}, {c:9}, {hap:3}, {pc:26}],
    "Ripcord Throw": [{c:4}, {hap:3}, {pc:23}],
    "Bell Ringer": [{c:4}, {hap:3}, {pc:23}],
    "Drive Impact: Steadfast Strike": [{pcat:25}, {hap:2}, {pc:35}],
    "Drive Reversal: Shapeless State": [{ip:19}, {hap:5}, {pc:31}],
    "Drive Parry": [{pcat:12}, {pc:33}],
    "Drive Rush": [{c:45}],
    "Taunt": [],
    "LK Bushin Senpukyaku": [{c:5}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:8}, {hap:3}, {pc:23}],
    "MK Bushin Senpukyaku": [{c:6}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:8}, {hap:3}, {pc:25}],
    "HK Bushin Senpukyaku": [{c:6}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:8}, {hap:3}, {pc:23}],
    "OD Bushin Senpukyaku": [{c:5}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:6}, {pc:1}, {hap:2}, {pc:23}],
    "Aerial Bushin Senpukyaku": [{c:7}, {hap:2}, {pc:7}, {hap:2}, {pc:7}, {hap:2}, {pc:12}],
    "OD Aerial Bushin Senpukyaku": [{c:7}, {hap:2}, {pc:2}, {hap:3}, {pc:2}, {hap:2}, {pc:2}, {hap:3}, {pc:2}, {hap:2}, {pc:12}],
    "LP Vagabond Edge": [{c:9}, {hap:3}, {pc:21}],
    "MP Vagabond Edge": [{c:16}, {hap:2}, {pc:28}],
    "HP Vagabond Edge": [{c:23}, {hap:2}, {pc:28}],
    "OD Vagabond Edge": [{c:16}, {hap:2}, {pc:28}],
    "Sprint": [{c:8}],
    "OD Sprint": [{c:6}],
    "Sprint > Torso Cleaver": [{c:21}, {hap:7}, {pc:16}],
    "Sprint > Shadow Slide": [{c:17}, {hap:12}, {pc:19}],
    "Sprint > Neck Hunter": [{c:26}, {hap:5}, {pc:19}],
    "Sprint > Emergency Stop": [{c:22}],
    "Sprint > Arc Step": [{c:22}, {hap:2}, {c:6}, {hap:2}, {pc:30}],
    "Arc Step > Bushin Hojin Kick": [{c:22}, {hap:2}, {c:6}, {hap:2}, {pc:18}, {c:12}, {hap:6}, {pc:20}],
    "Arc Step > Bushin Izuna Otoshi": [{c:22}, {hap:2}, {c:6}, {hap:2}, {pc:18}, {c:12}, {hap:6}, {pc:40}],
    "OD Sprint > Torso Cleaver": [{c:24}, {hap:7}, {pc:16}],
    "OD Sprint > Shadow Slide": [{c:15}, {hap:12}, {pc:19}],
    "OD Sprint > Neck Hunter": [{c:23}, {hap:5}, {pc:19}],
    "OD Sprint > Emergency Stop": [{c:21}],
    "OD Sprint > Arc Step": [{c:20}, {hap:2}, {c:6}, {hap:2}, {pc:30}],
    "OD Arc Step > Bushin Hojin Kick": [{c:20}, {hap:2}, {c:6}, {hap:2}, {pc:18}, {c:12}, {hap:3}, {c:13}, {hap:3}, {pc:12}],
    "OD Arc Step > Bushin Izuna Otoshi": [{c:20}, {hap:2}, {c:6}, {hap:2}, {pc:18}, {c:12}, {hap:6}, {pc:40}],
    "Hidden Variable": [{c:18}, {ip:8}, {pc:17}],
    "OD Hidden Variable": [{c:18}, {ip:8}, {pc:19}],
    "Genius at Play": [{c:44}],
    "OD Genius at Play": [{c:44}],
    "Shuriken Bomb": [{c:44}],
    "Shuriken Bomb Spread": [{c:44}],
    "Nue Twister": [{c:4}, {hap:3}],
    "OD Nue Twister": [{c:4}, {hap:3}],
    "Bushin Beats (0 stock)": [{sip:9}, {hap:3}, {pc:40}],
    "Bushin Beats (1 stock)": [{sip:9}, {hap:3}, {pc:40}],
    "Bushin Scramble": [{c:12}, {hap:8}, {pc:39}],
    "Soaring Bushin Scramble (air)": [{c:12}, {hap:9}, {pc:39}],
    "Bushin Ninjastar Cypher": [{ip:7}, {hap:8}, {pc:51}],
    "Bushin Ninjastar Cypher (Critical Art)": [{ip:7}, {hap:8}, {pc:51}]
  }
}
export default data;