export interface SF6Move {
  moveName: string,
  cmnName: string,
  plnCmd: string,
  numCmd: string,
  ezCmd: string,
  startup: string | number,
  active: string | number,
  recovery: string | number,
  total: string | number,
  onHit: string | number,
  onPC: string | number,
  onBlock: string | number,
  DRoH: string | number,
  DRoB: string | number,
  onPP: string | number,
  SA2oH: string | number,
  SA2oB: string | number,
  drinkOH: string | number,
  drinkOB: string | number,
  dmg: string | number,
  dmgScaling:  string,
  hcWinSpCa: string | number,
  hitstun: string | number,
  blockstun: string | number,
  hitstop: string | number,
  DDoH: string | number,
  DDoB: string | number,
  DGain: string | number,
  SelfSoH: string | number,
  SelfSoB: string | number,
  OppSoH: string | number,
  OppSoB: string | number,
  atkLvl: string,
  xx: string | string[],
  extraInfo: string[],
  moveType: string,
  moveMotion: string,
  moveButton: string,
  chp: string | number,
  i: number
}