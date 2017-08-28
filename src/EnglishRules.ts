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


/* Context definitions */
export const ANYTHING = "";
/* No context requirement */
export const NOTHING = " ";
/* Context is beginning or end of word */

export const LEFT_PART = 0;
export const MATCH_PART = 1;
export const RIGHT_PART = 2;
export const OUT_PART = 3;

export class TextToPhonemeRule {
    readonly leftPart: string;
    readonly matchPart: string;
    readonly rightPart: string;
    readonly output: string[];

    constructor(leftPart: string,
        matchPart: string,
        rightPart: string,
        ...output: string[]) {
        this.leftPart = leftPart;
        this.matchPart = matchPart;
        this.rightPart = rightPart;
        this.output = output;
    }
}

function textToPhonemeRuleSet(...rules: TextToPhonemeRule[]) {
    return rules;
}

/* = Punctuation */
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/

export const punct_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, " ", ANYTHING, Pause),
    new TextToPhonemeRule(ANYTHING, "-", ANYTHING, Silent),
    new TextToPhonemeRule(".", "'S", ANYTHING, z),
    new TextToPhonemeRule("#:.E", "'S", ANYTHING, z),
    new TextToPhonemeRule("#", "'S", ANYTHING, z),
    new TextToPhonemeRule(ANYTHING, "'", ANYTHING, Silent),
    new TextToPhonemeRule(ANYTHING, ",", ANYTHING, Pause),
    new TextToPhonemeRule(ANYTHING, ".", ANYTHING, Pause),
    new TextToPhonemeRule(ANYTHING, "?", ANYTHING, Pause),
    new TextToPhonemeRule(ANYTHING, "!", ANYTHING, Pause),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent),
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/

export const A_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "A", NOTHING, AX),
    new TextToPhonemeRule(NOTHING, "ARE", NOTHING, AA, r),
    new TextToPhonemeRule(NOTHING, "AR", "O", AX, r),
    new TextToPhonemeRule(ANYTHING, "AR", "#", EH, r),
    new TextToPhonemeRule("^", "AS", "#", EY, s),
    new TextToPhonemeRule(ANYTHING, "A", "WA", AX),
    new TextToPhonemeRule(ANYTHING, "AW", ANYTHING, AO),
    new TextToPhonemeRule(" :", "ANY", ANYTHING, EH, n, IY),
    new TextToPhonemeRule(ANYTHING, "A", "^+#", EY),
    new TextToPhonemeRule("#:", "ALLY", ANYTHING, AX, l, IY),
    new TextToPhonemeRule(NOTHING, "AL", "#", AX, l),
    new TextToPhonemeRule(ANYTHING, "AGAIN", ANYTHING, AX, g, EH, n),
    new TextToPhonemeRule("#:", "AG", "E", IH, j),
    new TextToPhonemeRule(ANYTHING, "A", "^+:#", AE),
    new TextToPhonemeRule(" :", "A", "^+ ", EY),
    new TextToPhonemeRule(ANYTHING, "A", "^%", EY),
    new TextToPhonemeRule(NOTHING, "ARR", ANYTHING, AX, r),
    new TextToPhonemeRule(ANYTHING, "ARR", ANYTHING, AE, r),
    new TextToPhonemeRule(" :", "AR", NOTHING, AA, r),
    new TextToPhonemeRule(ANYTHING, "AR", NOTHING, ER),
    new TextToPhonemeRule(ANYTHING, "AR", ANYTHING, AA, r),
    new TextToPhonemeRule(ANYTHING, "AIR", ANYTHING, EH, r),
    new TextToPhonemeRule(ANYTHING, "AI", ANYTHING, EY),
    new TextToPhonemeRule(ANYTHING, "AY", ANYTHING, EY),
    new TextToPhonemeRule(ANYTHING, "AU", ANYTHING, AO),
    new TextToPhonemeRule("#:", "AL", NOTHING, AX, l),
    new TextToPhonemeRule("#:", "ALS", NOTHING, AX, l, z),
    new TextToPhonemeRule(ANYTHING, "ALK", ANYTHING, AO, k),
    new TextToPhonemeRule(ANYTHING, "AL", "^", AO, l),
    new TextToPhonemeRule(" :", "ABLE", ANYTHING, EY, b, AX, l),
    new TextToPhonemeRule(ANYTHING, "ABLE", ANYTHING, AX, b, AX, l),
    new TextToPhonemeRule(ANYTHING, "ANG", "+", EY, n, j),
    new TextToPhonemeRule(ANYTHING, "A", ANYTHING, AE),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/

export const B_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "BE", "^#", b, IH),
    new TextToPhonemeRule(ANYTHING, "BEING", ANYTHING, b, IY, IH, NG),
    new TextToPhonemeRule(NOTHING, "BOTH", NOTHING, b, OW, TH),
    new TextToPhonemeRule(NOTHING, "BUS", "#", b, IH, z),
    new TextToPhonemeRule(ANYTHING, "BUIL", ANYTHING, b, IH, l),
    new TextToPhonemeRule(ANYTHING, "B", ANYTHING, b),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent),
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const C_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "CH", "^", k),
    new TextToPhonemeRule("^E", "CH", ANYTHING, k),
    new TextToPhonemeRule(ANYTHING, "CH", ANYTHING, CH),
    new TextToPhonemeRule(" S", "CI", "#", s, AY),
    new TextToPhonemeRule(ANYTHING, "CI", "A", SH),
    new TextToPhonemeRule(ANYTHING, "CI", "O", SH),
    new TextToPhonemeRule(ANYTHING, "CI", "EN", SH),
    new TextToPhonemeRule(ANYTHING, "C", "+", s),
    new TextToPhonemeRule(ANYTHING, "CK", ANYTHING, k),
    new TextToPhonemeRule(ANYTHING, "COM", "%", k, AH, m),
    new TextToPhonemeRule(ANYTHING, "C", ANYTHING, k),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/

export const D_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule("#:", "DED", NOTHING, d, IH, d),
    new TextToPhonemeRule(".E", "D", NOTHING, d),
    new TextToPhonemeRule("#:^E", "D", NOTHING, t),
    new TextToPhonemeRule(NOTHING, "DE", "^#", d, IH),
    new TextToPhonemeRule(NOTHING, "DO", NOTHING, d, UW),
    new TextToPhonemeRule(NOTHING, "DOES", ANYTHING, d, AH, z),
    new TextToPhonemeRule(NOTHING, "DOING", ANYTHING, d, UW, IH, NG),
    new TextToPhonemeRule(NOTHING, "DOW", ANYTHING, d, AW),
    new TextToPhonemeRule(ANYTHING, "DU", "A", j, UW),
    new TextToPhonemeRule(ANYTHING, "D", ANYTHING, d),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/

export const E_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule("#:", "E", NOTHING, Silent),
    new TextToPhonemeRule("':^", "E", NOTHING, Silent),
    new TextToPhonemeRule(" :", "E", NOTHING, IY),
    new TextToPhonemeRule("#", "ED", NOTHING, d),
    new TextToPhonemeRule("#:", "E", "D ", Silent),
    new TextToPhonemeRule(ANYTHING, "EV", "ER", EH, v),
    new TextToPhonemeRule(ANYTHING, "E", "^%", IY),
    new TextToPhonemeRule(ANYTHING, "ERI", "#", IY, r, IY),
    new TextToPhonemeRule(ANYTHING, "ERI", ANYTHING, EH, r, IH),
    new TextToPhonemeRule("#:", "ER", "#", ER),
    new TextToPhonemeRule(ANYTHING, "ER", "#", EH, r),
    new TextToPhonemeRule(ANYTHING, "ER", ANYTHING, ER),
    new TextToPhonemeRule(NOTHING, "EVEN", ANYTHING, IY, v, EH, n),
    new TextToPhonemeRule("#:", "E", "W", Silent),
    new TextToPhonemeRule("T", "EW", ANYTHING, UW),
    new TextToPhonemeRule("S", "EW", ANYTHING, UW),
    new TextToPhonemeRule("R", "EW", ANYTHING, UW),
    new TextToPhonemeRule("D", "EW", ANYTHING, UW),
    new TextToPhonemeRule("L", "EW", ANYTHING, UW),
    new TextToPhonemeRule("Z", "EW", ANYTHING, UW),
    new TextToPhonemeRule("N", "EW", ANYTHING, UW),
    new TextToPhonemeRule("J", "EW", ANYTHING, UW),
    new TextToPhonemeRule("TH", "EW", ANYTHING, UW),
    new TextToPhonemeRule("CH", "EW", ANYTHING, UW),
    new TextToPhonemeRule("SH", "EW", ANYTHING, UW),
    new TextToPhonemeRule(ANYTHING, "EW", ANYTHING, y, UW),
    new TextToPhonemeRule(ANYTHING, "E", "O", IY),
    new TextToPhonemeRule("#:S", "ES", NOTHING, IH, z),
    new TextToPhonemeRule("#:C", "ES", NOTHING, IH, z),
    new TextToPhonemeRule("#:G", "ES", NOTHING, IH, z),
    new TextToPhonemeRule("#:Z", "ES", NOTHING, IH, z),
    new TextToPhonemeRule("#:X", "ES", NOTHING, IH, z),
    new TextToPhonemeRule("#:J", "ES", NOTHING, IH, z),
    new TextToPhonemeRule("#:CH", "ES", NOTHING, IH, z),
    new TextToPhonemeRule("#:SH", "ES", NOTHING, IH, z),
    new TextToPhonemeRule("#:", "E", "S ", Silent),
    new TextToPhonemeRule("#:", "ELY", NOTHING, l, IY),
    new TextToPhonemeRule("#:", "EMENT", ANYTHING, m, EH, n, t),
    new TextToPhonemeRule(ANYTHING, "EFUL", ANYTHING, f, UH, l),
    new TextToPhonemeRule(ANYTHING, "EE", ANYTHING, IY),
    new TextToPhonemeRule(ANYTHING, "EARN", ANYTHING, ER, n),
    new TextToPhonemeRule(NOTHING, "EAR", "^", ER),
    new TextToPhonemeRule(ANYTHING, "EAD", ANYTHING, EH, d),
    new TextToPhonemeRule("#:", "EA", NOTHING, IY, AX),
    new TextToPhonemeRule(ANYTHING, "EA", "SU", EH),
    new TextToPhonemeRule(ANYTHING, "EA", ANYTHING, IY),
    new TextToPhonemeRule(ANYTHING, "EIGH", ANYTHING, EY),
    new TextToPhonemeRule(ANYTHING, "EI", ANYTHING, IY),
    new TextToPhonemeRule(NOTHING, "EYE", ANYTHING, AY),
    new TextToPhonemeRule(ANYTHING, "EY", ANYTHING, IY),
    new TextToPhonemeRule(ANYTHING, "EU", ANYTHING, y, UW),
    new TextToPhonemeRule(ANYTHING, "E", ANYTHING, EH),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/

export const F_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "FUL", ANYTHING, f, UH, l),
    new TextToPhonemeRule(ANYTHING, "F", ANYTHING, f),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/

export const G_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "GIV", ANYTHING, g, IH, v),
    new TextToPhonemeRule(NOTHING, "G", "I^", g),
    new TextToPhonemeRule(ANYTHING, "GE", "T", g, EH),
    new TextToPhonemeRule("SU", "GGES", ANYTHING, g, j, EH, s),
    new TextToPhonemeRule(ANYTHING, "GG", ANYTHING, g),
    new TextToPhonemeRule(" B#", "G", ANYTHING, g),
    new TextToPhonemeRule(ANYTHING, "G", "+", j),
    new TextToPhonemeRule(ANYTHING, "GREAT", ANYTHING, g, r, EY, t),
    new TextToPhonemeRule("#", "GH", ANYTHING, Silent),
    new TextToPhonemeRule(ANYTHING, "G", ANYTHING, g),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const H_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "HAV", ANYTHING, HH, AE, v),
    new TextToPhonemeRule(NOTHING, "HERE", ANYTHING, HH, IY, r),
    new TextToPhonemeRule(NOTHING, "HOUR", ANYTHING, AW, ER),
    new TextToPhonemeRule(ANYTHING, "HOW", ANYTHING, HH, AW),
    new TextToPhonemeRule(ANYTHING, "H", "#", HH),
    new TextToPhonemeRule(ANYTHING, "H", ANYTHING, Silent),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const I_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "IN", ANYTHING, IH, n),
    new TextToPhonemeRule(NOTHING, "I", NOTHING, AY),
    new TextToPhonemeRule(ANYTHING, "IN", "D", AY, n),
    new TextToPhonemeRule(ANYTHING, "IER", ANYTHING, IY, ER),
    new TextToPhonemeRule("#:R", "IED", ANYTHING, IY, d),
    new TextToPhonemeRule(ANYTHING, "IED", NOTHING, AY, d),
    new TextToPhonemeRule(ANYTHING, "IEN", ANYTHING, IY, EH, n),
    new TextToPhonemeRule(ANYTHING, "IE", "T", AY, EH),
    new TextToPhonemeRule(" :", "I", "%", AY),
    new TextToPhonemeRule(ANYTHING, "I", "%", IY),
    new TextToPhonemeRule(ANYTHING, "IE", ANYTHING, IY),
    new TextToPhonemeRule(ANYTHING, "I", "^+:#", IH),
    new TextToPhonemeRule(ANYTHING, "IR", "#", AY, r),
    new TextToPhonemeRule(ANYTHING, "IZ", "%", AY, z),
    new TextToPhonemeRule(ANYTHING, "IS", "%", AY, z),
    new TextToPhonemeRule(ANYTHING, "I", "D%", AY),
    new TextToPhonemeRule("+^", "I", "^+", IH),
    new TextToPhonemeRule(ANYTHING, "I", "T%", AY),
    new TextToPhonemeRule("#:^", "I", "^+", IH),
    new TextToPhonemeRule(ANYTHING, "I", "^+", AY),
    new TextToPhonemeRule(ANYTHING, "IR", ANYTHING, ER),
    new TextToPhonemeRule(ANYTHING, "IGH", ANYTHING, AY),
    new TextToPhonemeRule(ANYTHING, "ILD", ANYTHING, AY, l, d),
    new TextToPhonemeRule(ANYTHING, "IGN", NOTHING, AY, n),
    new TextToPhonemeRule(ANYTHING, "IGN", "^", AY, n),
    new TextToPhonemeRule(ANYTHING, "IGN", "%", AY, n),
    new TextToPhonemeRule(ANYTHING, "IQUE", ANYTHING, IY, k),
    new TextToPhonemeRule(ANYTHING, "I", ANYTHING, IH),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const J_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "J", ANYTHING, j),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const K_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "K", "N", Silent),
    new TextToPhonemeRule(ANYTHING, "K", ANYTHING, k),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const L_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "LO", "C#", l, OW),
    new TextToPhonemeRule("L", "L", ANYTHING, Silent),
    new TextToPhonemeRule("#:^", "L", "%", AX, l),
    new TextToPhonemeRule(ANYTHING, "LEAD", ANYTHING, l, IY, d),
    new TextToPhonemeRule(ANYTHING, "L", ANYTHING, l),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const M_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "MOV", ANYTHING, m, UW, v),
    new TextToPhonemeRule(ANYTHING, "M", ANYTHING, m),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const N_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule("E", "NG", "+", n, j),
    new TextToPhonemeRule(ANYTHING, "NG", "R", NG, g),
    new TextToPhonemeRule(ANYTHING, "NG", "#", NG, g),
    new TextToPhonemeRule(ANYTHING, "NGL", "%", NG, g, AX, l),
    new TextToPhonemeRule(ANYTHING, "NG", ANYTHING, NG),
    new TextToPhonemeRule(ANYTHING, "NK", ANYTHING, NG, k),
    new TextToPhonemeRule(NOTHING, "NOW", NOTHING, n, AW),
    new TextToPhonemeRule(ANYTHING, "N", ANYTHING, n),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const O_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "OF", NOTHING, AX, v),
    new TextToPhonemeRule(ANYTHING, "OROUGH", ANYTHING, ER, OW),
    new TextToPhonemeRule("#:", "OR", NOTHING, ER),
    new TextToPhonemeRule("#:", "ORS", NOTHING, ER, z),
    new TextToPhonemeRule(ANYTHING, "OR", ANYTHING, AO, r),
    new TextToPhonemeRule(NOTHING, "ONE", ANYTHING, w, AH, n),
    new TextToPhonemeRule(ANYTHING, "OW", ANYTHING, OW),
    new TextToPhonemeRule(NOTHING, "OVER", ANYTHING, OW, v, ER),
    new TextToPhonemeRule(ANYTHING, "OV", ANYTHING, AH, v),
    new TextToPhonemeRule(ANYTHING, "O", "^%", OW),
    new TextToPhonemeRule(ANYTHING, "O", "^EN", OW),
    new TextToPhonemeRule(ANYTHING, "O", "^I#", OW),
    new TextToPhonemeRule(ANYTHING, "OL", "D", OW, l),
    new TextToPhonemeRule(ANYTHING, "OUGHT", ANYTHING, AO, t),
    new TextToPhonemeRule(ANYTHING, "OUGH", ANYTHING, AH, f),
    new TextToPhonemeRule(NOTHING, "OU", ANYTHING, AW),
    new TextToPhonemeRule("H", "OU", "S#", AW),
    new TextToPhonemeRule(ANYTHING, "OUS", ANYTHING, AX, s),
    new TextToPhonemeRule(ANYTHING, "OUR", ANYTHING, AO, r),
    new TextToPhonemeRule(ANYTHING, "OULD", ANYTHING, UH, d),
    new TextToPhonemeRule("^", "OU", "^L", AH),
    new TextToPhonemeRule(ANYTHING, "OUP", ANYTHING, UW, p),
    new TextToPhonemeRule(ANYTHING, "OU", ANYTHING, AW),
    new TextToPhonemeRule(ANYTHING, "OY", ANYTHING, OY),
    new TextToPhonemeRule(ANYTHING, "OING", ANYTHING, OW, IH, NG),
    new TextToPhonemeRule(ANYTHING, "OI", ANYTHING, OY),
    new TextToPhonemeRule(ANYTHING, "OOR", ANYTHING, AO, r),
    new TextToPhonemeRule(ANYTHING, "OOK", ANYTHING, UH, k),
    new TextToPhonemeRule(ANYTHING, "OOD", ANYTHING, UH, d),
    new TextToPhonemeRule(ANYTHING, "OO", ANYTHING, UW),
    new TextToPhonemeRule(ANYTHING, "O", "E", OW),
    new TextToPhonemeRule(ANYTHING, "O", NOTHING, OW),
    new TextToPhonemeRule(ANYTHING, "OA", ANYTHING, OW),
    new TextToPhonemeRule(NOTHING, "ONLY", ANYTHING, OW, n, l, IY),
    new TextToPhonemeRule(NOTHING, "ONCE", ANYTHING, w, AH, n, s),
    new TextToPhonemeRule(ANYTHING, "ON'T", ANYTHING, OW, n, t),
    new TextToPhonemeRule("C", "O", "N", AA),
    new TextToPhonemeRule(ANYTHING, "O", "NG", AO),
    new TextToPhonemeRule(" :^", "O", "N", AH),
    new TextToPhonemeRule("I", "ON", ANYTHING, AX, n),
    new TextToPhonemeRule("#:", "ON", NOTHING, AX, n),
    new TextToPhonemeRule("#^", "ON", ANYTHING, AX, n),
    new TextToPhonemeRule(ANYTHING, "O", "ST ", OW),
    new TextToPhonemeRule(ANYTHING, "OF", "^", AO, f),
    new TextToPhonemeRule(ANYTHING, "OTHER", ANYTHING, AH, DH, ER),
    new TextToPhonemeRule(ANYTHING, "OSS", NOTHING, AO, s),
    new TextToPhonemeRule("#:^", "OM", ANYTHING, AH, m),
    new TextToPhonemeRule(ANYTHING, "O", ANYTHING, AA),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const P_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "PH", ANYTHING, f),
    new TextToPhonemeRule(ANYTHING, "PEOP", ANYTHING, p, IY, p),
    new TextToPhonemeRule(ANYTHING, "POW", ANYTHING, p, AW),
    new TextToPhonemeRule(ANYTHING, "PUT", NOTHING, p, UH, t),
    new TextToPhonemeRule(ANYTHING, "P", ANYTHING, p),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const Q_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "QUAR", ANYTHING, k, w, AO, r),
    new TextToPhonemeRule(ANYTHING, "QU", ANYTHING, k, w),
    new TextToPhonemeRule(ANYTHING, "Q", ANYTHING, k),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const R_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "RE", "^#", r, IY),
    new TextToPhonemeRule(ANYTHING, "R", ANYTHING, r),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const S_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "SH", ANYTHING, SH),
    new TextToPhonemeRule("#", "SION", ANYTHING, ZH, AX, n),
    new TextToPhonemeRule(ANYTHING, "SOME", ANYTHING, s, AH, m),
    new TextToPhonemeRule("#", "SUR", "#", ZH, ER),
    new TextToPhonemeRule(ANYTHING, "SUR", "#", SH, ER),
    new TextToPhonemeRule("#", "SU", "#", ZH, UW),
    new TextToPhonemeRule("#", "SSU", "#", SH, UW),
    new TextToPhonemeRule("#", "SED", NOTHING, z, d),
    new TextToPhonemeRule("#", "S", "#", z),
    new TextToPhonemeRule(ANYTHING, "SAID", ANYTHING, s, EH, d),
    new TextToPhonemeRule("^", "SION", ANYTHING, SH, AX, n),
    new TextToPhonemeRule(ANYTHING, "S", "S", Silent),
    new TextToPhonemeRule(".", "S", NOTHING, z),
    new TextToPhonemeRule("#:.E", "S", NOTHING, z),
    new TextToPhonemeRule("#:^##", "S", NOTHING, z),
    new TextToPhonemeRule("#:^#", "S", NOTHING, s),
    new TextToPhonemeRule("U", "S", NOTHING, s),
    new TextToPhonemeRule(" :#", "S", NOTHING, z),
    new TextToPhonemeRule(NOTHING, "SCH", "#", s, k),
    new TextToPhonemeRule(NOTHING, "SCH", ANYTHING, SH),
    new TextToPhonemeRule(ANYTHING, "S", "C+", Silent),
    new TextToPhonemeRule("#", "SM", ANYTHING, z, m),
    new TextToPhonemeRule("#", "SN", "'", z, AX, n),
    new TextToPhonemeRule(ANYTHING, "S", ANYTHING, s),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const T_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "THE", NOTHING, DH, AX),
    new TextToPhonemeRule(ANYTHING, "TO", NOTHING, t, UW),
    new TextToPhonemeRule(ANYTHING, "THAT", NOTHING, DH, AE, t),
    new TextToPhonemeRule(NOTHING, "THIS", NOTHING, DH, IH, s),
    new TextToPhonemeRule(NOTHING, "THEY", ANYTHING, DH, EY),
    new TextToPhonemeRule(NOTHING, "THERE", ANYTHING, DH, EH, r),
    new TextToPhonemeRule(ANYTHING, "THER", ANYTHING, DH, ER),
    new TextToPhonemeRule(ANYTHING, "THEIR", ANYTHING, DH, EH, r),
    new TextToPhonemeRule(NOTHING, "THAN", NOTHING, DH, AE, n),
    new TextToPhonemeRule(NOTHING, "THEM", NOTHING, DH, EH, m),
    new TextToPhonemeRule(ANYTHING, "THESE", NOTHING, DH, IY, z),
    new TextToPhonemeRule(NOTHING, "THEN", ANYTHING, DH, EH, n),
    new TextToPhonemeRule(ANYTHING, "THROUGH", ANYTHING, TH, r, UW),
    new TextToPhonemeRule(ANYTHING, "THOSE", ANYTHING, DH, OW, z),
    new TextToPhonemeRule(ANYTHING, "THOUGH", NOTHING, DH, OW),
    new TextToPhonemeRule(NOTHING, "THUS", ANYTHING, DH, AH, s),
    new TextToPhonemeRule(ANYTHING, "TH", ANYTHING, TH),
    new TextToPhonemeRule("#:", "TED", NOTHING, t, IH, d),
    new TextToPhonemeRule("S", "TI", "#N", CH),
    new TextToPhonemeRule(ANYTHING, "TI", "O", SH),
    new TextToPhonemeRule(ANYTHING, "TI", "A", SH),
    new TextToPhonemeRule(ANYTHING, "TIEN", ANYTHING, SH, AX, n),
    new TextToPhonemeRule(ANYTHING, "TUR", "#", CH, ER),
    new TextToPhonemeRule(ANYTHING, "TU", "A", CH, UW),
    new TextToPhonemeRule(NOTHING, "TWO", ANYTHING, t, UW),
    new TextToPhonemeRule(ANYTHING, "T", ANYTHING, t),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const U_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "UN", "I", y, UW, n),
    new TextToPhonemeRule(NOTHING, "UN", ANYTHING, AH, n),
    new TextToPhonemeRule(NOTHING, "UPON", ANYTHING, AX, p, AO, n),
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
    new TextToPhonemeRule(ANYTHING, "UR", "#", y, UH, r),
    new TextToPhonemeRule(ANYTHING, "UR", ANYTHING, ER),
    new TextToPhonemeRule(ANYTHING, "U", "^ ", AH),
    new TextToPhonemeRule(ANYTHING, "U", "^^", AH),
    new TextToPhonemeRule(ANYTHING, "UY", ANYTHING, AY),
    new TextToPhonemeRule(" G", "U", "#", Silent),
    new TextToPhonemeRule("G", "U", "%", Silent),
    new TextToPhonemeRule("G", "U", "#", w),
    new TextToPhonemeRule("#N", "U", ANYTHING, y, UW),
    new TextToPhonemeRule("T", "U", ANYTHING, UW),
    new TextToPhonemeRule("S", "U", ANYTHING, UW),
    new TextToPhonemeRule("R", "U", ANYTHING, UW),
    new TextToPhonemeRule("D", "U", ANYTHING, UW),
    new TextToPhonemeRule("L", "U", ANYTHING, UW),
    new TextToPhonemeRule("Z", "U", ANYTHING, UW),
    new TextToPhonemeRule("N", "U", ANYTHING, UW),
    new TextToPhonemeRule("J", "U", ANYTHING, UW),
    new TextToPhonemeRule("TH", "U", ANYTHING, UW),
    new TextToPhonemeRule("CH", "U", ANYTHING, UW),
    new TextToPhonemeRule("SH", "U", ANYTHING, UW),
    new TextToPhonemeRule(ANYTHING, "U", ANYTHING, y, UW),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const V_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "VIEW", ANYTHING, v, y, UW),
    new TextToPhonemeRule(ANYTHING, "V", ANYTHING, v),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const W_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(NOTHING, "WERE", ANYTHING, w, ER),
    new TextToPhonemeRule(ANYTHING, "WA", "S", w, AA),
    new TextToPhonemeRule(ANYTHING, "WA", "T", w, AA),
    new TextToPhonemeRule(ANYTHING, "WHERE", ANYTHING, WH, EH, r),
    new TextToPhonemeRule(ANYTHING, "WHAT", ANYTHING, WH, AA, t),
    new TextToPhonemeRule(ANYTHING, "WHOL", ANYTHING, HH, OW, l),
    new TextToPhonemeRule(ANYTHING, "WHO", ANYTHING, HH, UW),
    new TextToPhonemeRule(ANYTHING, "WH", ANYTHING, WH),
    new TextToPhonemeRule(ANYTHING, "WAR", ANYTHING, w, AO, r),
    new TextToPhonemeRule(ANYTHING, "WOR", "^", w, ER),
    new TextToPhonemeRule(ANYTHING, "WR", ANYTHING, r),
    new TextToPhonemeRule(ANYTHING, "W", ANYTHING, w),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const X_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "X", ANYTHING, k, s),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const Y_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "YOUNG", ANYTHING, y, AH, NG),
    new TextToPhonemeRule(NOTHING, "YOU", ANYTHING, y, UW),
    new TextToPhonemeRule(NOTHING, "YES", ANYTHING, y, EH, s),
    new TextToPhonemeRule(NOTHING, "Y", ANYTHING, y),
    new TextToPhonemeRule("#:^", "Y", NOTHING, IY),
    new TextToPhonemeRule("#:^", "Y", "I", IY),
    new TextToPhonemeRule(" :", "Y", NOTHING, AY),
    new TextToPhonemeRule(" :", "Y", "#", AY),
    new TextToPhonemeRule(" :", "Y", "^+:#", IH),
    new TextToPhonemeRule(" :", "Y", "^#", AY),
    new TextToPhonemeRule(ANYTHING, "Y", ANYTHING, IH),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);
/*
**      LEFT_PART       MATCH_PART      RIGHT_PART      OUT_PART
*/
export const Z_rules = textToPhonemeRuleSet(
    new TextToPhonemeRule(ANYTHING, "Z", ANYTHING, z),
    new TextToPhonemeRule(ANYTHING, UNKNOWN, ANYTHING, Silent)
);

export const rules: TextToPhonemeRule[][] = [
    punct_rules,
    A_rules, B_rules, C_rules, D_rules, E_rules, F_rules, G_rules,
    H_rules, I_rules, J_rules, K_rules, L_rules, M_rules, N_rules,
    O_rules, P_rules, Q_rules, R_rules, S_rules, T_rules, U_rules,
    V_rules, W_rules, X_rules, Y_rules, Z_rules
];
