/**
 *      English to Phoneme rules.
 *
 *      Derived from:
 *
 *           AUTOMATIC TRANSLATION OF ENGLISH TEXT TO PHONETICS
 *                  BY MEANS OF LETTER-TO-SOUND RULES
 *
 *                      NRL Report 7948
 *
 *                    January 21st, 1976
 *          Naval Research Laboratory, Washington, D.C.
 *
 *
 *      Published by the National Technical Information Service as
 *      document "AD/A021 929".
 *
 *
 *
 *      The Phoneme codes:
 *
 *              IY      bEEt            IH      bIt
 *              EY      gAte            EH      gEt
 *              AE      fAt             AA      fAther
 *              AO      lAWn            OW      lOne
 *              UH      fUll            UW      fOOl
 *              ER      mURdER          AX      About
 *              AH      bUt             AY      hIde
 *              AW      hOW             OY      tOY
 *
 *              p       Pack            b       Back
 *              t       Time            d       Dime
 *              k       Coat            g       Goat
 *              f       Fault           v       Vault
 *              TH      eTHer           DH      eiTHer
 *              s       Sue             z       Zoo
 *              SH      leaSH           ZH      leiSure
 *              HH      How             m       suM
 *              n       suN             NG      suNG
 *              l       Laugh           w       Wear
 *              y       Young           r       Rate
 *              CH      String          j       Jar
 *              WH      WHere
 *
 *
 *      Strings are made up of four parts:
 *
 *              The left context.
 *              The text to match.
 *              The right context.
 *              The phonemes to substitute for the matched text.
 *
 *      Procedure:
 *
 *              Seperate each block of letters (apostrophes included)
 *              and add a space on each side.  For each unmatched
 *              letter in the word, look through the rules where the
 *              text to match starts with the letter in the word.  If
 *              the text to match is found and the right and left
 *              context patterns also match, output the phonemes for
 *              that rule and skip to the next unmatched letter.
 *
 *
 *      Special Context Symbols:
 *
 *              #       One or more vowels
 *              :       Zero or more consonants
 *              ^       One consonant.
 *              .       One of B, D, V, G, J, L, M, N, R, W or Z (voiced
 *                      consonants)
 *              %       One of ER, E, ES, ED, ING, ELY (a suffix)
 *                      (Found in right context only)
 *              +       One of E, I or Y (a "front" vowel)
 *
 */

import {
    UNKNOWN,
    Phoneme,
    Pause,
    Silent,
    IY,
    IH,
    EY,
    EH,
    AE,
    AA,
    AO,
    OW,
    UH,
    UW,
    ER,
    AX,
    AH,
    AY,
    AW,
    OY,
    p,
    b,
    t,
    d,
    k,
    g,
    f,
    v,
    TH,
    DH,
    s,
    z,
    SH,
    ZH,
    HH,
    m,
    n,
    NG,
    l,
    w,
    y,
    r,
    CH,
    j,
    WH,
} from "./Phonemes";

/* Context definitions */
export const _ANYTHING_ = "";
/* No context requirement */
export const __NOTHING_ = " ";


export const BDVGJLMNRWZ = {
    "B": true,
    "D": true,
    "V": true,
    "G": true,
    "J": true,
    "L": true,
    "M": true,
    "N": true,
    "R": true,
    "W": true,
    "Z": true,
};

export function isBDVGJLMNRWZ(char: string): char is keyof typeof BDVGJLMNRWZ {
    return BDVGJLMNRWZ.hasOwnProperty(char);
}

export function isNotBDVGJLMNRWZ(char: string) {
    return !isBDVGJLMNRWZ(char);
}

export const EIY = {
    E: true,
    I: true,
    Y: true,
};

export function isEIY(char: string): char is keyof typeof EIY {
    return EIY.hasOwnProperty(char);
}

export function isNotEIY(char: string) {
    return !isEIY(char);
}

/* Context is beginning or end of word */
export class TextToPhonemeRule {
    readonly leftPart: string[];
    readonly matchPart: string;
    readonly rightPart: string[];
    readonly output: Phoneme[];

    constructor(leftPart: string,
                matchPart: string,
                rightPart: string,
                ...output: Phoneme[]) {
        this.leftPart = leftPart.split("");
        this.matchPart = matchPart;
        this.rightPart = rightPart.split("");
        this.output = output;
    }
}

function textToPhonemeRuleSet(...rules: TextToPhonemeRule[]) {
    return rules;
}

/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */

export const punct_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, " ", _ANYTHING_, Pause),
    new TextToPhonemeRule(_ANYTHING_, "-", _ANYTHING_, Silent),
    new TextToPhonemeRule(".", "'S", _ANYTHING_, z),
    new TextToPhonemeRule("#:.E", "'S", _ANYTHING_, z),
    new TextToPhonemeRule("#", "'S", _ANYTHING_, z),
    new TextToPhonemeRule(_ANYTHING_, "'", _ANYTHING_, Silent),
    new TextToPhonemeRule(_ANYTHING_, ",", _ANYTHING_, Pause),
    new TextToPhonemeRule(_ANYTHING_, ".", _ANYTHING_, Pause),
    new TextToPhonemeRule(_ANYTHING_, "?", _ANYTHING_, Pause),
    new TextToPhonemeRule(_ANYTHING_, "!", _ANYTHING_, Pause),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent),
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */

export const A_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "A", __NOTHING_, AX),
    new TextToPhonemeRule(__NOTHING_, "ARE", __NOTHING_, AA, r),
    new TextToPhonemeRule(__NOTHING_, "AR", "O", AX, r),
    new TextToPhonemeRule(_ANYTHING_, "AR", "#", EH, r),
    new TextToPhonemeRule("^", "AS", "#", EY, s),
    new TextToPhonemeRule(_ANYTHING_, "A", "WA", AX),
    new TextToPhonemeRule(_ANYTHING_, "AW", _ANYTHING_, AO),
    new TextToPhonemeRule(" :", "ANY", _ANYTHING_, EH, n, IY),
    new TextToPhonemeRule(_ANYTHING_, "A", "^+#", EY),
    new TextToPhonemeRule("#:", "ALLY", _ANYTHING_, AX, l, IY),
    new TextToPhonemeRule(__NOTHING_, "AL", "#", AX, l),
    new TextToPhonemeRule(_ANYTHING_, "AGAIN", _ANYTHING_, AX, g, EH, n),
    new TextToPhonemeRule("#:", "AG", "E", IH, j),
    new TextToPhonemeRule(_ANYTHING_, "A", "^+:#", AE),
    new TextToPhonemeRule(" :", "A", "^+ ", EY),
    new TextToPhonemeRule(_ANYTHING_, "A", "^%", EY),
    new TextToPhonemeRule(__NOTHING_, "ARR", _ANYTHING_, AX, r),
    new TextToPhonemeRule(_ANYTHING_, "ARR", _ANYTHING_, AE, r),
    new TextToPhonemeRule(" :", "AR", __NOTHING_, AA, r),
    new TextToPhonemeRule(_ANYTHING_, "AR", __NOTHING_, ER),
    new TextToPhonemeRule(_ANYTHING_, "AR", _ANYTHING_, AA, r),
    new TextToPhonemeRule(_ANYTHING_, "AIR", _ANYTHING_, EH, r),
    new TextToPhonemeRule(_ANYTHING_, "AI", _ANYTHING_, EY),
    new TextToPhonemeRule(_ANYTHING_, "AY", _ANYTHING_, EY),
    new TextToPhonemeRule(_ANYTHING_, "AU", _ANYTHING_, AO),
    new TextToPhonemeRule("#:", "AL", __NOTHING_, AX, l),
    new TextToPhonemeRule("#:", "ALS", __NOTHING_, AX, l, z),
    new TextToPhonemeRule(_ANYTHING_, "ALK", _ANYTHING_, AO, k),
    new TextToPhonemeRule(_ANYTHING_, "AL", "^", AO, l),
    new TextToPhonemeRule(" :", "ABLE", _ANYTHING_, EY, b, AX, l),
    new TextToPhonemeRule(_ANYTHING_, "ABLE", _ANYTHING_, AX, b, AX, l),
    new TextToPhonemeRule(_ANYTHING_, "ANG", "+", EY, n, j),
    new TextToPhonemeRule(_ANYTHING_, "A", _ANYTHING_, AE),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */

export const B_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "BE", "^#", b, IH),
    new TextToPhonemeRule(_ANYTHING_, "BEING", _ANYTHING_, b, IY, IH, NG),
    new TextToPhonemeRule(__NOTHING_, "BOTH", __NOTHING_, b, OW, TH),
    new TextToPhonemeRule(__NOTHING_, "BUS", "#", b, IH, z),
    new TextToPhonemeRule(_ANYTHING_, "BUIL", _ANYTHING_, b, IH, l),
    new TextToPhonemeRule(_ANYTHING_, "B", _ANYTHING_, b),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent),
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const C_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "CH", "^", k),
    new TextToPhonemeRule("^E", "CH", _ANYTHING_, k),
    new TextToPhonemeRule(_ANYTHING_, "CH", _ANYTHING_, CH),
    new TextToPhonemeRule(" S", "CI", "#", s, AY),
    new TextToPhonemeRule(_ANYTHING_, "CI", "A", SH),
    new TextToPhonemeRule(_ANYTHING_, "CI", "O", SH),
    new TextToPhonemeRule(_ANYTHING_, "CI", "EN", SH),
    new TextToPhonemeRule(_ANYTHING_, "C", "+", s),
    new TextToPhonemeRule(_ANYTHING_, "CK", _ANYTHING_, k),
    new TextToPhonemeRule(_ANYTHING_, "COM", "%", k, AH, m),
    new TextToPhonemeRule(_ANYTHING_, "C", _ANYTHING_, k),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */

export const D_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule("#:", "DED", __NOTHING_, d, IH, d),
    new TextToPhonemeRule(".E", "D", __NOTHING_, d),
    new TextToPhonemeRule("#:^E", "D", __NOTHING_, t),
    new TextToPhonemeRule(__NOTHING_, "DE", "^#", d, IH),
    new TextToPhonemeRule(__NOTHING_, "DO", __NOTHING_, d, UW),
    new TextToPhonemeRule(__NOTHING_, "DOES", _ANYTHING_, d, AH, z),
    new TextToPhonemeRule(__NOTHING_, "DOING", _ANYTHING_, d, UW, IH, NG),
    new TextToPhonemeRule(__NOTHING_, "DOW", _ANYTHING_, d, AW),
    new TextToPhonemeRule(_ANYTHING_, "DU", "A", j, UW),
    new TextToPhonemeRule(_ANYTHING_, "D", _ANYTHING_, d),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */

export const E_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule("#:", "E", __NOTHING_, Silent),
    new TextToPhonemeRule("':^", "E", __NOTHING_, Silent),
    new TextToPhonemeRule(" :", "E", __NOTHING_, IY),
    new TextToPhonemeRule("#", "ED", __NOTHING_, d),
    new TextToPhonemeRule("#:", "E", "D ", Silent),
    new TextToPhonemeRule(_ANYTHING_, "EV", "ER", EH, v),
    new TextToPhonemeRule(_ANYTHING_, "E", "^%", IY),
    new TextToPhonemeRule(_ANYTHING_, "ERI", "#", IY, r, IY),
    new TextToPhonemeRule(_ANYTHING_, "ERI", _ANYTHING_, EH, r, IH),
    new TextToPhonemeRule("#:", "ER", "#", ER),
    new TextToPhonemeRule(_ANYTHING_, "ER", "#", EH, r),
    new TextToPhonemeRule(_ANYTHING_, "ER", _ANYTHING_, ER),
    new TextToPhonemeRule(__NOTHING_, "EVEN", _ANYTHING_, IY, v, EH, n),
    new TextToPhonemeRule("#:", "E", "W", Silent),
    new TextToPhonemeRule("T", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("S", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("R", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("D", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("L", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("Z", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("N", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("J", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("TH", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("CH", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule("SH", "EW", _ANYTHING_, UW),
    new TextToPhonemeRule(_ANYTHING_, "EW", _ANYTHING_, y, UW),
    new TextToPhonemeRule(_ANYTHING_, "E", "O", IY),
    new TextToPhonemeRule("#:S", "ES", __NOTHING_, IH, z),
    new TextToPhonemeRule("#:C", "ES", __NOTHING_, IH, z),
    new TextToPhonemeRule("#:G", "ES", __NOTHING_, IH, z),
    new TextToPhonemeRule("#:Z", "ES", __NOTHING_, IH, z),
    new TextToPhonemeRule("#:X", "ES", __NOTHING_, IH, z),
    new TextToPhonemeRule("#:J", "ES", __NOTHING_, IH, z),
    new TextToPhonemeRule("#:CH", "ES", __NOTHING_, IH, z),
    new TextToPhonemeRule("#:SH", "ES", __NOTHING_, IH, z),
    new TextToPhonemeRule("#:", "E", "S ", Silent),
    new TextToPhonemeRule("#:", "ELY", __NOTHING_, l, IY),
    new TextToPhonemeRule("#:", "EMENT", _ANYTHING_, m, EH, n, t),
    new TextToPhonemeRule(_ANYTHING_, "EFUL", _ANYTHING_, f, UH, l),
    new TextToPhonemeRule(_ANYTHING_, "EE", _ANYTHING_, IY),
    new TextToPhonemeRule(_ANYTHING_, "EARN", _ANYTHING_, ER, n),
    new TextToPhonemeRule(__NOTHING_, "EAR", "^", ER),
    new TextToPhonemeRule(_ANYTHING_, "EAD", _ANYTHING_, EH, d),
    new TextToPhonemeRule("#:", "EA", __NOTHING_, IY, AX),
    new TextToPhonemeRule(_ANYTHING_, "EA", "SU", EH),
    new TextToPhonemeRule(_ANYTHING_, "EA", _ANYTHING_, IY),
    new TextToPhonemeRule(_ANYTHING_, "EIGH", _ANYTHING_, EY),
    new TextToPhonemeRule(_ANYTHING_, "EI", _ANYTHING_, IY),
    new TextToPhonemeRule(__NOTHING_, "EYE", _ANYTHING_, AY),
    new TextToPhonemeRule(_ANYTHING_, "EY", _ANYTHING_, IY),
    new TextToPhonemeRule(_ANYTHING_, "EU", _ANYTHING_, y, UW),
    new TextToPhonemeRule(_ANYTHING_, "E", _ANYTHING_, EH),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */

export const F_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "FUL", _ANYTHING_, f, UH, l),
    new TextToPhonemeRule(_ANYTHING_, "F", _ANYTHING_, f),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */

export const G_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "GIV", _ANYTHING_, g, IH, v),
    new TextToPhonemeRule(__NOTHING_, "G", "I^", g),
    new TextToPhonemeRule(_ANYTHING_, "GE", "T", g, EH),
    new TextToPhonemeRule("SU", "GGES", _ANYTHING_, g, j, EH, s),
    new TextToPhonemeRule(_ANYTHING_, "GG", _ANYTHING_, g),
    new TextToPhonemeRule(" B#", "G", _ANYTHING_, g),
    new TextToPhonemeRule(_ANYTHING_, "G", "+", j),
    new TextToPhonemeRule(_ANYTHING_, "GREAT", _ANYTHING_, g, r, EY, t),
    new TextToPhonemeRule("#", "GH", _ANYTHING_, Silent),
    new TextToPhonemeRule(_ANYTHING_, "G", _ANYTHING_, g),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const H_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "HAV", _ANYTHING_, HH, AE, v),
    new TextToPhonemeRule(__NOTHING_, "HERE", _ANYTHING_, HH, IY, r),
    new TextToPhonemeRule(__NOTHING_, "HOUR", _ANYTHING_, AW, ER),
    new TextToPhonemeRule(_ANYTHING_, "HOW", _ANYTHING_, HH, AW),
    new TextToPhonemeRule(_ANYTHING_, "H", "#", HH),
    new TextToPhonemeRule(_ANYTHING_, "H", _ANYTHING_, Silent),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const I_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "IN", _ANYTHING_, IH, n),
    new TextToPhonemeRule(__NOTHING_, "I", __NOTHING_, AY),
    new TextToPhonemeRule(_ANYTHING_, "IN", "D", AY, n),
    new TextToPhonemeRule(_ANYTHING_, "IER", _ANYTHING_, IY, ER),
    new TextToPhonemeRule("#:R", "IED", _ANYTHING_, IY, d),
    new TextToPhonemeRule(_ANYTHING_, "IED", __NOTHING_, AY, d),
    new TextToPhonemeRule(_ANYTHING_, "IEN", _ANYTHING_, IY, EH, n),
    new TextToPhonemeRule(_ANYTHING_, "IE", "T", AY, EH),
    new TextToPhonemeRule(" :", "I", "%", AY),
    new TextToPhonemeRule(_ANYTHING_, "I", "%", IY),
    new TextToPhonemeRule(_ANYTHING_, "IE", _ANYTHING_, IY),
    new TextToPhonemeRule(_ANYTHING_, "I", "^+:#", IH),
    new TextToPhonemeRule(_ANYTHING_, "IR", "#", AY, r),
    new TextToPhonemeRule(_ANYTHING_, "IZ", "%", AY, z),
    new TextToPhonemeRule(_ANYTHING_, "IS", "%", AY, z),
    new TextToPhonemeRule(_ANYTHING_, "I", "D%", AY),
    new TextToPhonemeRule("+^", "I", "^+", IH),
    new TextToPhonemeRule(_ANYTHING_, "I", "T%", AY),
    new TextToPhonemeRule("#:^", "I", "^+", IH),
    new TextToPhonemeRule(_ANYTHING_, "I", "^+", AY),
    new TextToPhonemeRule(_ANYTHING_, "IR", _ANYTHING_, ER),
    new TextToPhonemeRule(_ANYTHING_, "IGH", _ANYTHING_, AY),
    new TextToPhonemeRule(_ANYTHING_, "ILD", _ANYTHING_, AY, l, d),
    new TextToPhonemeRule(_ANYTHING_, "IGN", __NOTHING_, AY, n),
    new TextToPhonemeRule(_ANYTHING_, "IGN", "^", AY, n),
    new TextToPhonemeRule(_ANYTHING_, "IGN", "%", AY, n),
    new TextToPhonemeRule(_ANYTHING_, "IQUE", _ANYTHING_, IY, k),
    new TextToPhonemeRule(_ANYTHING_, "I", _ANYTHING_, IH),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const J_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "J", _ANYTHING_, j),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const K_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "K", "N", Silent),
    new TextToPhonemeRule(_ANYTHING_, "K", _ANYTHING_, k),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const L_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "LO", "C#", l, OW),
    new TextToPhonemeRule("L", "L", _ANYTHING_, Silent),
    new TextToPhonemeRule("#:^", "L", "%", AX, l),
    new TextToPhonemeRule(_ANYTHING_, "LEAD", _ANYTHING_, l, IY, d),
    new TextToPhonemeRule(_ANYTHING_, "L", _ANYTHING_, l),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const M_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "MOV", _ANYTHING_, m, UW, v),
    new TextToPhonemeRule(_ANYTHING_, "M", _ANYTHING_, m),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const N_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule("E", "NG", "+", n, j),
    new TextToPhonemeRule(_ANYTHING_, "NG", "R", NG, g),
    new TextToPhonemeRule(_ANYTHING_, "NG", "#", NG, g),
    new TextToPhonemeRule(_ANYTHING_, "NGL", "%", NG, g, AX, l),
    new TextToPhonemeRule(_ANYTHING_, "NG", _ANYTHING_, NG),
    new TextToPhonemeRule(_ANYTHING_, "NK", _ANYTHING_, NG, k),
    new TextToPhonemeRule(__NOTHING_, "NOW", __NOTHING_, n, AW),
    new TextToPhonemeRule(_ANYTHING_, "N", _ANYTHING_, n),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const O_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "OF", __NOTHING_, AX, v),
    new TextToPhonemeRule(_ANYTHING_, "OROUGH", _ANYTHING_, ER, OW),
    new TextToPhonemeRule("#:", "OR", __NOTHING_, ER),
    new TextToPhonemeRule("#:", "ORS", __NOTHING_, ER, z),
    new TextToPhonemeRule(_ANYTHING_, "OR", _ANYTHING_, AO, r),
    new TextToPhonemeRule(__NOTHING_, "ONE", _ANYTHING_, w, AH, n),
    new TextToPhonemeRule(_ANYTHING_, "OW", _ANYTHING_, OW),
    new TextToPhonemeRule(__NOTHING_, "OVER", _ANYTHING_, OW, v, ER),
    new TextToPhonemeRule(_ANYTHING_, "OV", _ANYTHING_, AH, v),
    new TextToPhonemeRule(_ANYTHING_, "O", "^%", OW),
    new TextToPhonemeRule(_ANYTHING_, "O", "^EN", OW),
    new TextToPhonemeRule(_ANYTHING_, "O", "^I#", OW),
    new TextToPhonemeRule(_ANYTHING_, "OL", "D", OW, l),
    new TextToPhonemeRule(_ANYTHING_, "OUGHT", _ANYTHING_, AO, t),
    new TextToPhonemeRule(_ANYTHING_, "OUGH", _ANYTHING_, AH, f),
    new TextToPhonemeRule(__NOTHING_, "OU", _ANYTHING_, AW),
    new TextToPhonemeRule("H", "OU", "S#", AW),
    new TextToPhonemeRule(_ANYTHING_, "OUS", _ANYTHING_, AX, s),
    new TextToPhonemeRule(_ANYTHING_, "OUR", _ANYTHING_, AO, r),
    new TextToPhonemeRule(_ANYTHING_, "OULD", _ANYTHING_, UH, d),
    new TextToPhonemeRule("^", "OU", "^L", AH),
    new TextToPhonemeRule(_ANYTHING_, "OUP", _ANYTHING_, UW, p),
    new TextToPhonemeRule(_ANYTHING_, "OU", _ANYTHING_, AW),
    new TextToPhonemeRule(_ANYTHING_, "OY", _ANYTHING_, OY),
    new TextToPhonemeRule(_ANYTHING_, "OING", _ANYTHING_, OW, IH, NG),
    new TextToPhonemeRule(_ANYTHING_, "OI", _ANYTHING_, OY),
    new TextToPhonemeRule(_ANYTHING_, "OOR", _ANYTHING_, AO, r),
    new TextToPhonemeRule(_ANYTHING_, "OOK", _ANYTHING_, UH, k),
    new TextToPhonemeRule(_ANYTHING_, "OOD", _ANYTHING_, UH, d),
    new TextToPhonemeRule(_ANYTHING_, "OO", _ANYTHING_, UW),
    new TextToPhonemeRule(_ANYTHING_, "O", "E", OW),
    new TextToPhonemeRule(_ANYTHING_, "O", __NOTHING_, OW),
    new TextToPhonemeRule(_ANYTHING_, "OA", _ANYTHING_, OW),
    new TextToPhonemeRule(__NOTHING_, "ONLY", _ANYTHING_, OW, n, l, IY),
    new TextToPhonemeRule(__NOTHING_, "ONCE", _ANYTHING_, w, AH, n, s),
    new TextToPhonemeRule(_ANYTHING_, "ON'T", _ANYTHING_, OW, n, t),
    new TextToPhonemeRule("C", "O", "N", AA),
    new TextToPhonemeRule(_ANYTHING_, "O", "NG", AO),
    new TextToPhonemeRule(" :^", "O", "N", AH),
    new TextToPhonemeRule("I", "ON", _ANYTHING_, AX, n),
    new TextToPhonemeRule("#:", "ON", __NOTHING_, AX, n),
    new TextToPhonemeRule("#^", "ON", _ANYTHING_, AX, n),
    new TextToPhonemeRule(_ANYTHING_, "O", "ST ", OW),
    new TextToPhonemeRule(_ANYTHING_, "OF", "^", AO, f),
    new TextToPhonemeRule(_ANYTHING_, "OTHER", _ANYTHING_, AH, DH, ER),
    new TextToPhonemeRule(_ANYTHING_, "OSS", __NOTHING_, AO, s),
    new TextToPhonemeRule("#:^", "OM", _ANYTHING_, AH, m),
    new TextToPhonemeRule(_ANYTHING_, "O", _ANYTHING_, AA),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const P_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "PH", _ANYTHING_, f),
    new TextToPhonemeRule(_ANYTHING_, "PEOP", _ANYTHING_, p, IY, p),
    new TextToPhonemeRule(_ANYTHING_, "POW", _ANYTHING_, p, AW),
    new TextToPhonemeRule(_ANYTHING_, "PUT", __NOTHING_, p, UH, t),
    new TextToPhonemeRule(_ANYTHING_, "P", _ANYTHING_, p),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const Q_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "QUAR", _ANYTHING_, k, w, AO, r),
    new TextToPhonemeRule(_ANYTHING_, "QU", _ANYTHING_, k, w),
    new TextToPhonemeRule(_ANYTHING_, "Q", _ANYTHING_, k),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const R_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "RE", "^#", r, IY),
    new TextToPhonemeRule(_ANYTHING_, "R", _ANYTHING_, r),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const S_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "SH", _ANYTHING_, SH),
    new TextToPhonemeRule("#", "SION", _ANYTHING_, ZH, AX, n),
    new TextToPhonemeRule(_ANYTHING_, "SOME", _ANYTHING_, s, AH, m),
    new TextToPhonemeRule("#", "SUR", "#", ZH, ER),
    new TextToPhonemeRule(_ANYTHING_, "SUR", "#", SH, ER),
    new TextToPhonemeRule("#", "SU", "#", ZH, UW),
    new TextToPhonemeRule("#", "SSU", "#", SH, UW),
    new TextToPhonemeRule("#", "SED", __NOTHING_, z, d),
    new TextToPhonemeRule("#", "S", "#", z),
    new TextToPhonemeRule(_ANYTHING_, "SAID", _ANYTHING_, s, EH, d),
    new TextToPhonemeRule("^", "SION", _ANYTHING_, SH, AX, n),
    new TextToPhonemeRule(_ANYTHING_, "S", "S", Silent),
    new TextToPhonemeRule(".", "S", __NOTHING_, z),
    new TextToPhonemeRule("#:.E", "S", __NOTHING_, z),
    new TextToPhonemeRule("#:^##", "S", __NOTHING_, z),
    new TextToPhonemeRule("#:^#", "S", __NOTHING_, s),
    new TextToPhonemeRule("U", "S", __NOTHING_, s),
    new TextToPhonemeRule(" :#", "S", __NOTHING_, z),
    new TextToPhonemeRule(__NOTHING_, "SCH", "#", s, k),
    new TextToPhonemeRule(__NOTHING_, "SCH", _ANYTHING_, SH),
    new TextToPhonemeRule(_ANYTHING_, "S", "C+", Silent),
    new TextToPhonemeRule("#", "SM", _ANYTHING_, z, m),
    new TextToPhonemeRule("#", "SN", "'", z, AX, n),
    new TextToPhonemeRule(_ANYTHING_, "S", _ANYTHING_, s),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const T_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "THE", __NOTHING_, DH, AX),
    new TextToPhonemeRule(_ANYTHING_, "TO", __NOTHING_, t, UW),
    new TextToPhonemeRule(_ANYTHING_, "THAT", __NOTHING_, DH, AE, t),
    new TextToPhonemeRule(__NOTHING_, "THIS", __NOTHING_, DH, IH, s),
    new TextToPhonemeRule(__NOTHING_, "THEY", _ANYTHING_, DH, EY),
    new TextToPhonemeRule(__NOTHING_, "THERE", _ANYTHING_, DH, EH, r),
    new TextToPhonemeRule(_ANYTHING_, "THER", _ANYTHING_, DH, ER),
    new TextToPhonemeRule(_ANYTHING_, "THEIR", _ANYTHING_, DH, EH, r),
    new TextToPhonemeRule(__NOTHING_, "THAN", __NOTHING_, DH, AE, n),
    new TextToPhonemeRule(__NOTHING_, "THEM", __NOTHING_, DH, EH, m),
    new TextToPhonemeRule(_ANYTHING_, "THESE", __NOTHING_, DH, IY, z),
    new TextToPhonemeRule(__NOTHING_, "THEN", _ANYTHING_, DH, EH, n),
    new TextToPhonemeRule(_ANYTHING_, "THROUGH", _ANYTHING_, TH, r, UW),
    new TextToPhonemeRule(_ANYTHING_, "THOSE", _ANYTHING_, DH, OW, z),
    new TextToPhonemeRule(_ANYTHING_, "THOUGH", __NOTHING_, DH, OW),
    new TextToPhonemeRule(__NOTHING_, "THUS", _ANYTHING_, DH, AH, s),
    new TextToPhonemeRule(_ANYTHING_, "TH", _ANYTHING_, TH),
    new TextToPhonemeRule("#:", "TED", __NOTHING_, t, IH, d),
    new TextToPhonemeRule("S", "TI", "#N", CH),
    new TextToPhonemeRule(_ANYTHING_, "TI", "O", SH),
    new TextToPhonemeRule(_ANYTHING_, "TI", "A", SH),
    new TextToPhonemeRule(_ANYTHING_, "TIEN", _ANYTHING_, SH, AX, n),
    new TextToPhonemeRule(_ANYTHING_, "TUR", "#", CH, ER),
    new TextToPhonemeRule(_ANYTHING_, "TU", "A", CH, UW),
    new TextToPhonemeRule(__NOTHING_, "TWO", _ANYTHING_, t, UW),
    new TextToPhonemeRule(_ANYTHING_, "T", _ANYTHING_, t),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const U_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "UN", "I", y, UW, n),
    new TextToPhonemeRule(__NOTHING_, "UN", _ANYTHING_, AH, n),
    new TextToPhonemeRule(__NOTHING_, "UPON", _ANYTHING_, AX, p, AO, n),
    new TextToPhonemeRule("T", "UR", "#", UH, r),
    new TextToPhonemeRule("S", "UR", "#", UH, r),
    new TextToPhonemeRule("R", "UR", "#", UH, r),
    new TextToPhonemeRule("D", "UR", "#", UH, r),
    new TextToPhonemeRule("L", "UR", "#", UH, r),
    new TextToPhonemeRule("Z", "UR", "#", UH, r),
    new TextToPhonemeRule("N", "UR", "#", UH, r),
    new TextToPhonemeRule("J", "UR", "#", UH, r),
    new TextToPhonemeRule("TH", "UR", "#", UH, r),
    new TextToPhonemeRule("CH", "UR", "#", UH, r),
    new TextToPhonemeRule("SH", "UR", "#", UH, r),
    new TextToPhonemeRule(_ANYTHING_, "UR", "#", y, UH, r),
    new TextToPhonemeRule(_ANYTHING_, "UR", _ANYTHING_, ER),
    new TextToPhonemeRule(_ANYTHING_, "U", "^ ", AH),
    new TextToPhonemeRule(_ANYTHING_, "U", "^^", AH),
    new TextToPhonemeRule(_ANYTHING_, "UY", _ANYTHING_, AY),
    new TextToPhonemeRule(" G", "U", "#", Silent),
    new TextToPhonemeRule("G", "U", "%", Silent),
    new TextToPhonemeRule("G", "U", "#", w),
    new TextToPhonemeRule("#N", "U", _ANYTHING_, y, UW),
    new TextToPhonemeRule("T", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("S", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("R", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("D", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("L", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("Z", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("N", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("J", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("TH", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("CH", "U", _ANYTHING_, UW),
    new TextToPhonemeRule("SH", "U", _ANYTHING_, UW),
    new TextToPhonemeRule(_ANYTHING_, "U", _ANYTHING_, y, UW),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const V_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "VIEW", _ANYTHING_, v, y, UW),
    new TextToPhonemeRule(_ANYTHING_, "V", _ANYTHING_, v),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const W_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(__NOTHING_, "WERE", _ANYTHING_, w, ER),
    new TextToPhonemeRule(_ANYTHING_, "WA", "S", w, AA),
    new TextToPhonemeRule(_ANYTHING_, "WA", "T", w, AA),
    new TextToPhonemeRule(_ANYTHING_, "WHERE", _ANYTHING_, WH, EH, r),
    new TextToPhonemeRule(_ANYTHING_, "WHAT", _ANYTHING_, WH, AA, t),
    new TextToPhonemeRule(_ANYTHING_, "WHOL", _ANYTHING_, HH, OW, l),
    new TextToPhonemeRule(_ANYTHING_, "WHO", _ANYTHING_, HH, UW),
    new TextToPhonemeRule(_ANYTHING_, "WH", _ANYTHING_, WH),
    new TextToPhonemeRule(_ANYTHING_, "WAR", _ANYTHING_, w, AO, r),
    new TextToPhonemeRule(_ANYTHING_, "WOR", "^", w, ER),
    new TextToPhonemeRule(_ANYTHING_, "WR", _ANYTHING_, r),
    new TextToPhonemeRule(_ANYTHING_, "W", _ANYTHING_, w),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const X_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "X", _ANYTHING_, k, s),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const Y_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "YOUNG", _ANYTHING_, y, AH, NG),
    new TextToPhonemeRule(__NOTHING_, "YOU", _ANYTHING_, y, UW),
    new TextToPhonemeRule(__NOTHING_, "YES", _ANYTHING_, y, EH, s),
    new TextToPhonemeRule(__NOTHING_, "Y", _ANYTHING_, y),
    new TextToPhonemeRule("#:^", "Y", __NOTHING_, IY),
    new TextToPhonemeRule("#:^", "Y", "I", IY),
    new TextToPhonemeRule(" :", "Y", __NOTHING_, AY),
    new TextToPhonemeRule(" :", "Y", "#", AY),
    new TextToPhonemeRule(" :", "Y", "^+:#", IH),
    new TextToPhonemeRule(" :", "Y", "^#", AY),
    new TextToPhonemeRule(_ANYTHING_, "Y", _ANYTHING_, IH),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);
/*
 **      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
 */
export const Z_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(_ANYTHING_, "Z", _ANYTHING_, z),
    new TextToPhonemeRule(_ANYTHING_, UNKNOWN, _ANYTHING_, Silent)
);

export const getRulesForEnglish = function (letter: string): TextToPhonemeRule[] {
    switch (letter) {
        case "A":
            return A_rules;
        case "B":
            return B_rules;
        case "C":
            return C_rules;
        case "D":
            return D_rules;
        case "E":
            return E_rules;
        case "F":
            return F_rules;
        case "G":
            return G_rules;
        case "H":
            return H_rules;
        case "I":
            return I_rules;
        case "J":
            return J_rules;
        case "K":
            return K_rules;
        case "L":
            return L_rules;
        case "M":
            return M_rules;
        case "N":
            return N_rules;
        case "O":
            return O_rules;
        case "P":
            return P_rules;
        case "Q":
            return Q_rules;
        case "R":
            return R_rules;
        case "S":
            return S_rules;
        case "T":
            return T_rules;
        case "U":
            return U_rules;
        case "V":
            return V_rules;
        case "W":
            return W_rules;
        case "X":
            return X_rules;
        case "Y":
            return Y_rules;
        case "Z":
            return Z_rules;
        default:
            return punct_rules;
    }
};
