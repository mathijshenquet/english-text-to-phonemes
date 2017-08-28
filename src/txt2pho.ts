
/*
*      English to Phoneme translation.
*
*      English.rules are made up of four parts:
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
*              letter in the word, look through the English.rules where the
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
*                      (Right context only)
*              +       One of E, I or Y (a "front" vowel)
*/

function isUppercaseLetter(chr: string) {
    return (!(chr < 'A' || chr > 'Z'));
}

function isLowercaseLetter(chr: string) {
    return (!(chr < 'a' || chr > 'z'));
}

function isAlphabeticLetter(chr: string) {
    return (isUppercaseLetter(chr) || isLowercaseLetter(chr));
}

function isConsonantLetter(chr: string) {
    return (isUppercaseLetter(chr) && !isVowelLetter(chr));
}

function isVowelLetter(chr: string) {
    return (chr === 'A' || chr === 'E' || chr === 'I' ||
        chr === 'O' || chr === 'U');
}

/**
 * @param word [SPACE][LETTER]+
 */
export function translateNormalisedWordToPhonemes(word: string[]) {
    let type: number;       /* First letter of match part */
    const wordLength: number = word.length;

    const phonemes: (string|[Phoneme])[] = [];
    let indexRule: number;

    let index: number = 1;      /* Current position in word */
    do {
        const chr = word[index];
        if (isUppercaseLetter(chr))
            type = chr - 'A' + 1;
        else
            type = 0;

        indexRule = find_rule(word, index, English.rules[type]);

        if (indexRule == -1) {
            // could not find
            phonemes.add(new UnknownCharacter(word[index]));
            index++;
        } else {
            phonemes.addAll(English.rules[type][indexRule].output);
            index += English.rules[type][indexRule].matchPart.length();
        }
    }
    while (index < wordLength);
    return phonemes;
}

export function find_rule(word:string[] , index: number, chosenRules: TextToPhonemeRule[]) {
    const rule: TextToPhonemeRule ;
    const indexRule : int = 0;
    const left: string ; 
    const right: string;
    const match: String ;
    const indexMatch: int ;
    const remainder: int ;
    const wordLength : int = word.length;

    for (; ; )        /* Search for the rule */ {
        rule = chosenRules[indexRule];
        indexRule++;
        match = rule.matchPart;

        if (Phoneme.UNKNOWN.name.equals(match)) /* bad symbol! */ {
            // char c = word[index];
            // Log.e(
            //   "TextToPhoneme",
            //   ("Error: Can't find rule for: " + c + " in " + new String(word))
            // );
            return -1; /* Skip it! */
        }
        for (remainder = index, indexMatch = 0; (indexMatch != match.length()) && (remainder != wordLength); indexMatch++, remainder++) {
            if (match.charAt(indexMatch) != word[remainder])
                break;
        }

        if (indexMatch != match.length())     /* found missmatch */
            continue;

        left = rule.leftPart;
        right = rule.rightPart;

        if (!leftmatch(left.toCharArray(), word, index - 1))
            continue;
        if (!rightmatch(right.toCharArray(), word, remainder))
            continue;

        return --indexRule;
    }
}


export function leftmatch(pattern: string[], /* pattern to match in text */
    context: string[], /*text to be matched */
    indexText: number)/* index of last char of text to be matched */ {
    let pat: number;
    let count: number;

    if (pattern.length == 0)   /* null string matches any context */ {
        return true;
    }

    /* point to last character in pattern string */
    count = pattern.length;
    pat = count - 1;

    for (; count > 0; pat--, count--) {
        /* First check for simple text or space */
        if (isAlphabeticLetter(pattern[pat]) || pattern[pat] == '\'' || pattern[pat] == ' ')
            if (pattern[pat] != context[indexText])
                return false;
            else {
                indexText--;
                continue;
            }

        let carpat: string = (pattern[pat]);
        if (carpat == '#') {
            /* One or more vowels */
            if (!isVowelLetter(context[indexText]))
                return false;

            indexText--;

            while (isVowelLetter(context[indexText]))
                indexText--;
        } else if (carpat == ':') {
            /* Zero or more consonants */
            while (isConsonantLetter(context[indexText]))
                indexText--;
        } else if (carpat == '^') {
            /* One consonant */
            if (!isConsonantLetter(context[indexText]))
                return false;
            indexText--;
        } else if (carpat == '.') {
            /* B, D, V, G, J, L, M, N, R, W, Z */
            if (context[indexText] != 'B' && context[indexText] != 'D' && context[indexText] != 'V'
                && context[indexText] != 'G' && context[indexText] != 'J' && context[indexText] != 'L'
                && context[indexText] != 'M' && context[indexText] != 'N' && context[indexText] != 'R'
                && context[indexText] != 'W' && context[indexText] != 'Z')
                return false;
            indexText--;
        } else if (carpat == '+') {
            /* E, I or Y (front vowel) */
            if (context[indexText] != 'E' && context[indexText] != 'I' && context[indexText] != 'Y')
                return false;
            indexText--;
        } else {
            System.err.println("Bad char in left rule: '" + pattern[pat] + "'");
            return false;
        }
    }

    return true;
}


export function rightmatch(pattern: string[], /* pattern to match in text */
    context: string[], /*text to be matched */
    indexText: number)/* index of last char of text to be matched */ {
    if (pattern.length == 0)   /* null string matches any context */
        return true;

    let pat: number;
    for (pat = 0; pat != pattern.length; pat++) {
        /* First check for simple text or space */
        if (isAlphabeticLetter(pattern[pat]) || pattern[pat] == '\'' || pattern[pat] == ' ')
            if (pattern[pat] != context[indexText])
                return false;
            else {
                indexText++;
                continue;
            }
        let carpat: string = pattern[pat];
        if (carpat == '#') {
            /* One or more vowels */
            if (!isVowelLetter(context[indexText]))
                return false;

            indexText++;

            while (isVowelLetter(context[indexText]))
                indexText++;
        } else if (carpat == ':') {
            /* Zero or more consonants */
            while (isConsonantLetter(context[indexText]))
                indexText++;
        } else if (carpat == '^') {
            /* One consonant */
            if (!isConsonantLetter(context[indexText]))
                return false;
            indexText++;
        } else if (carpat == '.') {
            /* B, D, V, G, J, L, M, N, R, W, Z */
            if (context[indexText] != 'B' && context[indexText] != 'D' && context[indexText] != 'V'
                && context[indexText] != 'G' && context[indexText] != 'J' && context[indexText] != 'L'
                && context[indexText] != 'M' && context[indexText] != 'N' && context[indexText] != 'R'
                && context[indexText] != 'W' && context[indexText] != 'Z')
                return false;
            indexText++;
        } else if (carpat == '+') {
            /* E, I or Y (front vowel) */
            if (context[indexText] != 'E' && context[indexText] != 'I' && context[indexText] != 'Y')
                return false;
            indexText++;
        } else if (carpat == '%') {
            /* ER, E, ES, ED, ING, ELY (a suffix) */
            if (context[indexText] == 'E') {
                indexText++;
                if (context[indexText] == 'L') {
                    indexText++;
                    if (context[indexText] == 'Y') {
//                            indexText++;
                        break;
                    } else {
//                            indexText--; /* Don't gobble L */
                        break;
                    }
                } else if (context[indexText] == 'R' || context[indexText] == 'S'
                    || context[indexText] == 'D')
//                        indexText++;
                    break;
            } else if (context[indexText] == 'I') {
                indexText++;
                if (context[indexText] == 'N') {
                    indexText++;
                    if (context[indexText] == 'G') {
//                            indexText++;
                        break;
                    }
                }
                return false;
            } else
                return false;
        } else {
            System.err.println("Bad char in right rule:'" + pattern[pat] + "'");
            return false;
        }
    }

    return true;
}

export function toPhonemes(text: string ): (string|[Phoneme])[] {
    const upperCase = text.toUpperCase(); // Locale.US
    const chars: string[] = new char[upperCase.length() + 2];

    // prepend and append string with space
    chars[0] = ' ';
    for (let i = 0; i < upperCase.length(); i++)
        chars[i + 1] = upperCase.charAt(i);
    chars[chars.length - 1] = ' ';

    return (translateNormalisedWordToPhonemes(chars));
}

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
 * NB - wh is a doublet of two phonemes but 'w' won't have passed the isPhonemeVowel test so won't need to be handled here
 */
export function isDiphthong(ch1: Phoneme, ch2: Phoneme) {
    return 
       ch1 === 'ɑ' && ch2 === 'ɪ'// AY diphthong
    || ch1 === 'ɑ' && ch2 === 'ʊ'// AW diphthong
    || ch1 === 'ɔ' && ch2 === 'ɪ'//OY diphthong
    ;
}

const PLOSIVES = {
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
const phonemeFricatives = {
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

export function isFricative(ch: string) {
    return phonemeFricatives.hasOwnProperty(ch);
}
}
