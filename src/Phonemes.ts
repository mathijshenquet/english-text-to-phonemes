
/** Phoneme definitions */
export const Pause = (" ")/* Short silence */;
export const Silent = ("")/* No phonemes */;
export const UNKNOWN = ("!%@$#");

/* Phoneme definitions - 41 Strings for phonemes in English
AY, AW, OY, AND WH need two unicode chars to make std IPA representation*/
export type Phoneme = "i" |
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
