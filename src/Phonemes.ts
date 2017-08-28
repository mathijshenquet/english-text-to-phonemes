/** Phoneme definitions */
export const Pause: Phoneme = (" ")/* Short silence */;
export const Silent: Phoneme = ("")/* No phonemes */;
export const UNKNOWN: Phoneme = ("!%@$#");

/* Phoneme definitions - 41 Strings for phonemes in English
 AY, AW, OY, AND WH need two unicode chars to make std IPA representation*/
export type Phoneme =
    "!%@$#" |

        " "|
        "" |

        "i" |
        "ɪ" |
        "e" |
        "ɛ" |
        "æ" |
        "ɑ" |
        "ɔ" |
        "o" |
        "ʊ" |
        "u" |
        "ɚ" |
        "ə" |
        "ʌ" |
        "ɑɪ" |
        "ɑʊ" |
        "ɔɪ" |
        "p" |
        "b" |
        "t" |
        "d" |
        "k" |
        "g" |
        "f" |
        "v" |
        "θ" |
        "ð" |
        "s" |
        "z" |
        "ʃ" |
        "ʒ" |
        "h" |
        "m" |
        "n" |
        "ŋ" |
        "l" |
        "w" |
        "j" |
        "ɹ" |
        "ʧ" |
        "ʤ" |
        "hw";

export const IY: Phoneme = ("i");
export const IH: Phoneme = ("ɪ");
export const EY: Phoneme = ("e");
export const EH: Phoneme = ("ɛ");
export const AE: Phoneme = ("æ");
export const AA: Phoneme = ("ɑ");
export const AO: Phoneme = ("ɔ");
export const OW: Phoneme = ("o");
export const UH: Phoneme = ("ʊ");
export const UW: Phoneme = ("u");
export const ER: Phoneme = ("ɚ");
export const AX: Phoneme = ("ə");
export const AH: Phoneme = ("ʌ");
export const AY: Phoneme = ("ɑɪ");
export const AW: Phoneme = ("ɑʊ");
export const OY: Phoneme = ("ɔɪ");
export const p: Phoneme = ("p");
export const b: Phoneme = ("b");
export const t: Phoneme = ("t");
export const d: Phoneme = ("d");
export const k: Phoneme = ("k");
export const g: Phoneme = ("g");
export const f: Phoneme = ("f");
export const v: Phoneme = ("v");
export const TH: Phoneme = ("θ");
export const DH: Phoneme = ("ð");
export const s: Phoneme = ("s");
export const z: Phoneme = ("z");
export const SH: Phoneme = ("ʃ");
export const ZH: Phoneme = ("ʒ");
export const HH: Phoneme = ("h");
export const m: Phoneme = ("m");
export const n: Phoneme = ("n");
export const NG: Phoneme = ("ŋ");
export const l: Phoneme = ("l");
export const w: Phoneme = ("w");
export const y: Phoneme = ("j");
export const r: Phoneme = ("ɹ");
export const CH: Phoneme = ("ʧ");
export const j: Phoneme = ("ʤ");
export const WH: Phoneme = ("hw");


// noinspection NonAsciiCharacters
export const VOWELS = {
    'i': true,
    'ɪ': true,
    'e': true,
    'ɛ': true,
    'æ': true,
    'ɑ': true,
    'ɔ': true,
    'o': true,
    'ʊ': true,
    'u': true,
    'ɚ': true,
    'ə': true,
    'ʌ': true,
};

export function isVowel(ch: string) {
    return VOWELS.hasOwnProperty(ch);
}

export function isConsonant(ch: string) {
    return !isVowel(ch);
}

/**
 * NB - wh is a doublet of two phonemes but 'w' won't have passed the isVowel test so won't need to be handled here
 */
export function isDiphthong(ch1: Phoneme, ch2: Phoneme) {
    return ch1 === 'ɑ' && ch2 === 'ɪ'// AY diphthong
        || ch1 === 'ɑ' && ch2 === 'ʊ'// AW diphthong
        || ch1 === 'ɔ' && ch2 === 'ɪ'//OY diphthong
        ;
}

export const PLOSIVES = {
    'p': true,
    'b': true,
    't': true,
    'd': true,
    'k': true,
    'k': true,
    'g': true,
};


export function isPlosive(ch: Phoneme) {
    return PLOSIVES.hasOwnProperty(ch);
}

// noinspection NonAsciiCharacters
export const FRICATIVES = {
    'f': true,
    'v': true,
    'θ': true,
    'ð': true,
    's': true,
    'z': true,
    'ʃ': true,
    'ʒ': true,
    'h': true,
    'ʧ': true,
    'ʤ': true
};

export function isFricative(ch: Phoneme) {
    return FRICATIVES.hasOwnProperty(ch);
}
