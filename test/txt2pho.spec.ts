import "mocha";
import {expect} from "chai";
import {toPhonemes} from "../src/index";
import {stringifyPhonemes} from "../src/Phonemes";


describe("txt2pho", () => {
    it(
        "fox"
        , () => {
            expect(stringifyPhonemes(toPhonemes(
                "That quick beige fox jumped in the air over each thin dog. Look out, I shout, for he's foiled you again, creating chaos."
            ))).to.equal("ðæt kwɪk big∅ fɑks ʤʌmp∅t ɪn ðə ɛɹ ovɚ iʧ θɪn dɑg  lʊk ɑʊt  ɑɪ ʃɑʊt  fɔɹ hɛz fɔɪl∅d ju əgɛn  kɹitɪŋ ʧæɑs  ");
        });

    it(
        "perfect for certain Received Pronunciation accents"
        , () => {
            expect(stringifyPhonemes(toPhonemes(
                "Are those shy Eurasian footwear, cowboy chaps, or jolly earthmoving headgear?"
            ))).to.equal("ɑɹ ðoz ʃɑɪ juɹesɪæn futwiɹ  kobɔɪ ʧæps  ɔɹ ʤɑl∅i ɚθmuvɪŋ hɛdʤiɹ  ");
        });


    it(
        "dinosaur"
        , () => {
            expect(stringifyPhonemes(toPhonemes(
                "The hungry purple dinosaur ate the kind, zingy fox, the jabbering crab, and the mad whale and started vending and quacking."
            ))).to.equal("ðə hʌŋgɹi pɚpəl∅ dɪnɑzɔɹ et∅ ðə kɑɪnd  zɪŋi fɑks  ðə ʤæbbiɹɪŋ kɹæb  ænd ðə mæd hwel∅ ænd stɑɹtɪd vɛndɪŋ ænd kwækɪŋ  ");
        });


    it(
        "for certain US accents and phonological analyses"
        , () => {
            expect(stringifyPhonemes(toPhonemes(
                "With tenure, Suzie’d have all the more leisure for yachting, but her publications are no good."
            ))).to.equal("wɪθ tɛnʊɹɛ  suziɛ’d hæv∅ ɔl∅ ðə mɔɹ∅ liʒɚ∅ fɔɹ jæʧtɪŋ  bʌt hɚ pʌblɪkeʃənz ɑɹ no gʊd  ");
        });

    it("perfect for certain accents with the cot-caught merger", () => {
        expect(stringifyPhonemes(toPhonemes(
            "Shaw, those twelve beige hooks are joined if I patch a young, gooey mouth."
        ))).to.equal("ʃɔ  ðoz twɛlv∅ big∅ hʊks ɑɹ ʤɔɪn∅d ɪf ɑɪ pætʧ ə jʌŋ  gui mɑʊθ  ");
    });

    it("beige hue", () => {
        expect(stringifyPhonemes(toPhonemes(
            "The beige hue on the waters of the loch impressed all, including the French queen, before she heard that symphony again, just as young Arthur wanted."
        ))).to.equal("ðə big∅ hju∅ ɑn ðə wɑtɚz əv ðə lɑʧ ɪmpɹɛ∅s∅t ɔl∅  ɪnkludɪŋ ðə fɹɛnʧ kwin  bɪfɔɹ∅ ʃi hiɹd ðæt sɪmfʌni əgɛn  ʤʌst æz jʌŋ ɑɹθɚ wæntɛd  ");
    });


    it("supercalifragilisticexpialidocious", () => {
        expect(stringifyPhonemes(toPhonemes(
            `supercalifragilisticexpialidocious`
            )
        )).to.equal("supɚkælɪfɹæʤɪlɪstɪsɛkspɪælɪdoʃəs ");
    });

    it("should convert trill lyrics", () => {
        expect(stringifyPhonemes(toPhonemes(
            `Ayo Peace lord I heard you back on the block
[?] had the hammer he was up in the spot
I had your red bottoms walking on eggshells you got it
Six car garage all exotic
Four bad hoes all exotic
White stripes on the Off-White galoshes
Just Don shorts Supersonics
Get the one fives and tens let's go shopping
Vera Wang famous
On a yacht speed racing
Chasing Ninos lifestyle bitches and cars
I'm a get richer give it all to my son
Each one teach one
Stay away from fuck niggas
And take care of your moms`
            )
        )).to.equal("eo pis∅ lɔɹd ɑɪ hiɹd ju bæk ɑn ðə blɑk\n[ ] hæd ðə hæmmɚ hi wɑz ʌp ɪn ðə spɑt\nɪ hæd juɹ ɹɛd bɑttʌmz wɔkɪŋ ɑn ɛgʃɛl∅z ju gɑt ɪt\nsɪks kɑɹ gɛɹɪʤ∅ ɔl∅ ɛksɑtɪk\nfɔɹ bæd ho∅z ɔl∅ ɛksɑtɪk\nhwɑɪt∅ stɹɑɪp∅s ɑn ðə ɔff∅hwɑɪt∅ gælɑʃɛs\nʤʌst dʌn ʃɔɹts supɚsɑnɪks\ngɛt ðə wʌn fɑɪv∅z ænd tɛnz lɛt∅s go ʃɑppɪŋ\nvɛɹə wæŋ fæməs\nɑn ə jæʧt spid ɹesɪŋ\nʧesɪŋ nɪnɑs lɪfɛstɪəl∅ bɪtʧɪz ænd kɑɹs\nɪ∅m ə gɛt ɹɪʧɚ gɪv∅ ɪt ɔl∅ tu mɑɪ sʌn\niʧ wʌn tiʧ wʌn\nste əwe fɹɑm fʌk nɪgæs\nænd tek∅ kɛɹ∅ əv juɹ mɑmz ");
    });
});
