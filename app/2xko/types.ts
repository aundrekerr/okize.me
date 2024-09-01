type Riot2XKODirectionalNotation = 
"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | // cardinal
// "236" | "214" | // qcf
// "623" | "421" | // DP
// "63214" | "41236" | // half-circle
// "46" | "64" | "28" | "18" | // charge
">" | "or" | "/" // next move, or, slash
;

type Riot2XKOButtonNotation = "L" | "M" | "H" | "S1" | "S2" | "T" | "D";

type Riot2XKONotation = Riot2XKODirectionalNotation | Riot2XKOButtonNotation;

// 236|214|623|421|63214|41236|46|64|28|18|4268