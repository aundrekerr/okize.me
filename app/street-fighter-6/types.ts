type DirectionalNotation = 
"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | // cardinal
// "236" | "214" | // qcf
// "623" | "421" | // DP
// "63214" | "41236" | // half-circle
// "46" | "64" | "28" | "18" | // charge
"4268" | // 360
">" | "or" | "/" // next move, or, slash
;

type ButtonNotation = "P" | "K" | "LP" | "MP" | "HP" | "LK" | "MK" | "HK";

type Notation = DirectionalNotation | ButtonNotation;

// 236|214|623|421|63214|41236|46|64|28|18|4268