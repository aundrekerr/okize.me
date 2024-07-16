export default function moveAdvantageDisplay(game: string, adv: string | number) {
  if (game === "street-fighter-6") {
    if (typeof adv === "string") return ""
    if (adv === 0) return "text-amber-600" // light yellow
    if (adv < 0 && adv > -5) return "text-red-600" // light red
    if (adv < 0 && adv <= -5) return "text-red-800" // red
    if (adv > 0 && adv < 5) return "text-green-600" // light green
    if (adv > 0 && adv >= 5) return "text-green-800" // green
    return ""
  }
}