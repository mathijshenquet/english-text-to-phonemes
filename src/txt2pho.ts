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

import {Phoneme, UNKNOWN} from "./Phonemes";
import {TextToPhonemeRule, getRulesForEnglish, isNotBDVGJLMNRWZ, isNotEIY} from "./EnglishRules";

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
 * @param rules
 */
export function translateNormalisedWordToPhonemes(word: string[], rules: (type: string) => TextToPhonemeRule[]): (string|[Phoneme])[] {
    const wordLength: number = word.length;
    const phonemes: (string|[Phoneme])[] = [];

    let index: number = 1;
    /* Current position in word */
    do {
        const oldIndex = index;

        /* First letter of match part */
        const chr = word[index];
        const rulesForChar = rules(chr);
        const matchedRule = matchRule(word, index, rulesForChar);

        if (!matchedRule) {
            // could not find
            phonemes.push(word[index]);
            index++;
        } else {
            phonemes.push(matchedRule.output);
            index += matchedRule.matchPart.length;
        }

        if (index <= oldIndex) throw new Error("Must move forward");
    }
    while (index < wordLength);

    return phonemes;
}

export function matchRule(word: string[], index: number, rulesForChar: TextToPhonemeRule[]): TextToPhonemeRule {
    let indexMatch: number;
    let remainder: number;
    const wordLength: number = word.length;

    /* Search for the rule */
    for (let rule: TextToPhonemeRule of rulesForChar) {
        const match: string = rule.matchPart;

        if (UNKNOWN === (match))
        /* bad symbol! */
        // console.warn(("Error: Can't find rule for: " + word[index] + " in " + new String(word)));
            return undefined;
        /* Skip it! */

        for (remainder = index, indexMatch = 0; (indexMatch !== match.length) && (remainder !== wordLength); indexMatch++, remainder++) {
            if (match.charAt(indexMatch) !== word[remainder]) break;
        }

        if (indexMatch !== match.length)     /* found mismatch */
            continue;

        if (!leftMatch(rule.leftPart, word, index - 1))
            continue;
        if (!rightMatch(rule.rightPart, word, remainder))
            continue;

        return rule;
    }
    throw new Error("Could not find rule, not even fallback rule");
}

export function leftMatch(pattern: string[], /* pattern to match in text */
                          context: string[], /*text to be matched */
                          indexText: number)/* index of last char of text to be matched */ {
    if (pattern.length === 0)   /* empty string matches any context */
        return true;

    /* start at last character in pattern string */
    for (let count = pattern.length, patternIndex = count - 1; count > 0; patternIndex--, count--) {
        /* First check for simple text or space */
        if (isAlphabeticLetter(
                pattern[patternIndex])
            || pattern[patternIndex] === "'"
            || pattern[patternIndex] === " "
        )
            if (pattern[patternIndex] !== context[indexText])
                return false;
            else {
                indexText--;
                continue;
            }

        // else (not simple text or space)

        switch ((pattern[patternIndex])) {
            case "#":
                /* One or more vowels */
                if (!isVowelLetter(context[indexText])) return false;
                else do indexText--;
                while (isVowelLetter(context[indexText]));
                break;
            case ":":
                /* Zero or more consonants */
                while (isConsonantLetter(context[indexText])) indexText--;
                break;
            case "^":
                /* One consonant */
                if (!isConsonantLetter(context[indexText])) return false;
                else indexText--;
                break;
            case ".":
                const char = context[indexText];
                /* B, D, V, G, J, L, M, N, R, W, Z */
                if (isNotBDVGJLMNRWZ(char)) return false;
                else indexText--;
                break;
            case "+":
                /* E, I or Y (front vowel) */
                if (isNotEIY(context[indexText])) return false;
                else indexText--;
                break;
            default:
                throw new Error("Bad char in left rule: '" + pattern[patternIndex] + "'");
            // return false;
        }
    }
    return true;
}


export function rightMatch(pattern: string[], /* pattern to match in text */
                           context: string[], /*text to be matched */
                           indexText: number)/* index of last char of text to be matched */ {
    if (pattern.length == 0)   /* null string matches any context */
        return true;

    for (let currentPatternCharacter of pattern) {
        /* First check for simple text or space */
        if (
            isAlphabeticLetter(currentPatternCharacter)
            || currentPatternCharacter === '\''
            || currentPatternCharacter === ' '
        )
            if (currentPatternCharacter !== context[indexText]) return false;
            else {
                indexText++;
                continue;
            }
        switch (currentPatternCharacter) {
            case "#":
                /* One or more vowels */
                if (!isVowelLetter(context[indexText])) return false;
                else do indexText++;
                while (isVowelLetter(context[indexText]));
                break;
            case ":":
                /* Zero or more consonants */
                while (isConsonantLetter(context[indexText]))
                    indexText++;
                break;
            case "^":
                /* One consonant */
                if (!isConsonantLetter(context[indexText]))
                    return false;
                indexText++;
                break;
            case ".":
                /* B, D, V, G, J, L, M, N, R, W, Z */
                if (isNotBDVGJLMNRWZ(context[indexText]))
                    return false;
                indexText++;
                break;
            case "+":
                /* E, I or Y (front vowel) */
                if (isNotEIY(context[indexText]))
                    return false;
                indexText++;
                break;
            case "%":
                /* ER, E, ES, ED, ING, ELY (a suffix) */
                if (context[indexText] === 'E') {
                    indexText++;
                    if (context[indexText] === 'L') {
                        indexText++;
                        if (context[indexText] === 'Y') {
                            // indexText++;
                            break;
                        } else {
                            // indexText--; /* Don't gobble L */
                            break;
                        }
                    } else if (context[indexText] === 'R' || context[indexText] === 'S'
                        || context[indexText] === 'D')
                    // indexText++;
                        break;
                } else if (context[indexText] === 'I') {
                    indexText++; // todo just +1, +2 :/
                    if (context[indexText] === 'N') {
                        indexText++;
                        if (context[indexText] === 'G') {
                            // indexText++;
                            break; // todo return true ???
                        }
                    }
                    return false;
                } else
                    return false;
                break;
            default:
                throw new Error("Bad char in right rule:'" + currentPatternCharacter + "'");
            // return false;
        }
    }

    return true;
}

export function toPhonemes(text: string): (string|[Phoneme])[] {
    // prepend and append string with space
    const chars: string[] = [" "].concat(text.toUpperCase(/*"en", "en-US", "en-UK"*/).split(""), " ");
    return translateNormalisedWordToPhonemes(chars, getRulesForEnglish);
}
