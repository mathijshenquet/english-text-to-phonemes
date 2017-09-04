"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var index_1 = require("../src/index");
var Phonemes_1 = require("../src/Phonemes");
describe("txt2pho", function () {
    it("fox", function () {
        chai_1.expect(Phonemes_1.stringifyPhonemes(index_1.toPhonemes("That quick beige fox jumped in the air over each thin dog. Look out, I shout, for he's foiled you again, creating chaos."))).to.equal("ðæt kwɪk big∅ fɑks ʤʌmp∅t ɪn ðə ɛɹ ovɚ iʧ θɪn dɑg  lʊk ɑʊt  ɑɪ ʃɑʊt  fɔɹ hɛz fɔɪl∅d ju əgɛn  kɹitɪŋ ʧæɑs  ");
    });
    it("perfect for certain Received Pronunciation accents", function () {
        chai_1.expect(Phonemes_1.stringifyPhonemes(index_1.toPhonemes("Are those shy Eurasian footwear, cowboy chaps, or jolly earthmoving headgear?"))).to.equal("ɑɹ ðoz ʃɑɪ juɹesɪæn futwiɹ  kobɔɪ ʧæps  ɔɹ ʤɑl∅i ɚθmuvɪŋ hɛdʤiɹ  ");
    });
    it("dinosaur", function () {
        chai_1.expect(Phonemes_1.stringifyPhonemes(index_1.toPhonemes("The hungry purple dinosaur ate the kind, zingy fox, the jabbering crab, and the mad whale and started vending and quacking."))).to.equal("ðə hʌŋgɹi pɚpəl∅ dɪnɑzɔɹ et∅ ðə kɑɪnd  zɪŋi fɑks  ðə ʤæbbiɹɪŋ kɹæb  ænd ðə mæd hwel∅ ænd stɑɹtɪd vɛndɪŋ ænd kwækɪŋ  ");
    });
    it("for certain US accents and phonological analyses", function () {
        chai_1.expect(Phonemes_1.stringifyPhonemes(index_1.toPhonemes("With tenure, Suzie’d have all the more leisure for yachting, but her publications are no good."))).to.equal("wɪθ tɛnʊɹɛ  suziɛ’d hæv∅ ɔl∅ ðə mɔɹ∅ liʒɚ∅ fɔɹ jæʧtɪŋ  bʌt hɚ pʌblɪkeʃənz ɑɹ no gʊd  ");
    });
    it("perfect for certain accents with the cot-caught merger", function () {
        chai_1.expect(Phonemes_1.stringifyPhonemes(index_1.toPhonemes("Shaw, those twelve beige hooks are joined if I patch a young, gooey mouth."))).to.equal("ʃɔ  ðoz twɛlv∅ big∅ hʊks ɑɹ ʤɔɪn∅d ɪf ɑɪ pætʧ ə jʌŋ  gui mɑʊθ  ");
    });
    it("beige hue", function () {
        chai_1.expect(Phonemes_1.stringifyPhonemes(index_1.toPhonemes("The beige hue on the waters of the loch impressed all, including the French queen, before she heard that symphony again, just as young Arthur wanted."))).to.equal("ðə big∅ hju∅ ɑn ðə wɑtɚz əv ðə lɑʧ ɪmpɹɛ∅s∅t ɔl∅  ɪnkludɪŋ ðə fɹɛnʧ kwin  bɪfɔɹ∅ ʃi hiɹd ðæt sɪmfʌni əgɛn  ʤʌst æz jʌŋ ɑɹθɚ wæntɛd  ");
    });
    it("supercalifragilisticexpialidocious", function () {
        chai_1.expect(Phonemes_1.stringifyPhonemes(index_1.toPhonemes("supercalifragilisticexpialidocious"))).to.equal("supɚkælɪfɹæʤɪlɪstɪsɛkspɪælɪdoʃəs ");
    });
    it("should convert trill lyrics", function () {
        chai_1.expect(Phonemes_1.stringifyPhonemes(index_1.toPhonemes("Ayo Peace lord I heard you back on the block\n[?] had the hammer he was up in the spot\nI had your red bottoms walking on eggshells you got it\nSix car garage all exotic\nFour bad hoes all exotic\nWhite stripes on the Off-White galoshes\nJust Don shorts Supersonics\nGet the one fives and tens let's go shopping\nVera Wang famous\nOn a yacht speed racing\nChasing Ninos lifestyle bitches and cars\nI'm a get richer give it all to my son\nEach one teach one\nStay away from fuck niggas\nAnd take care of your moms"))).to.equal("eo pis∅ lɔɹd ɑɪ hiɹd ju bæk ɑn ðə blɑk\n[ ] hæd ðə hæmmɚ hi wɑz ʌp ɪn ðə spɑt\nɪ hæd juɹ ɹɛd bɑttʌmz wɔkɪŋ ɑn ɛgʃɛl∅z ju gɑt ɪt\nsɪks kɑɹ gɛɹɪʤ∅ ɔl∅ ɛksɑtɪk\nfɔɹ bæd ho∅z ɔl∅ ɛksɑtɪk\nhwɑɪt∅ stɹɑɪp∅s ɑn ðə ɔff∅hwɑɪt∅ gælɑʃɛs\nʤʌst dʌn ʃɔɹts supɚsɑnɪks\ngɛt ðə wʌn fɑɪv∅z ænd tɛnz lɛt∅s go ʃɑppɪŋ\nvɛɹə wæŋ fæməs\nɑn ə jæʧt spid ɹesɪŋ\nʧesɪŋ nɪnɑs lɪfɛstɪəl∅ bɪtʧɪz ænd kɑɹs\nɪ∅m ə gɛt ɹɪʧɚ gɪv∅ ɪt ɔl∅ tu mɑɪ sʌn\niʧ wʌn tiʧ wʌn\nste əwe fɹɑm fʌk nɪgæs\nænd tek∅ kɛɹ∅ əv juɹ mɑmz ");
    });
});
