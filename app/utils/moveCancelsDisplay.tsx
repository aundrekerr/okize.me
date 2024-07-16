export default function moveCancelsDisplay(game: string, cancel: string) {
  if (game === "street-fighter-6") {
    // if (cancel === "ch") return "Chain"
    // if (cancel === "tc") return "Target Combo"
    // if (cancel === "sp") return "Special"
    // if (cancel === "su") return "Super Art"
    // if (cancel === "su1") return "Super Art 1"
    // if (cancel === "su2") return "Super Art 2"
    // if (cancel === "su3") return "Super Art 3"
    if (cancel === "j") return "jump.png"
    if (cancel === "ch") return "chain.png"
    if (cancel === "tc") return "target-combo.png"
    if (cancel === "sp") return "drive.png"
    if (cancel === "su") return "super-art.png"
    if (cancel === "su1") return "super-art.png"
    if (cancel === "su2") return "super-art.png"
    if (cancel === "su3") return "super-art.png"
    return ""
  }
}