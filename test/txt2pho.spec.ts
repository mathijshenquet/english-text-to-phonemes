import "mocha";
import {expect} from "chai";
import {toPhonemes} from "../src/index"


describe("txt2pho", () => {
    it(
        "fox"
        , () => {
            expect(toPhonemes(
                "That quick beige fox jumped in the air over each thin dog. Look out, I shout, for he's foiled you again, creating chaos."
            )).to.equal("");
        });

    it(
        "perfect for certain Received Pronunciation accents"
        , () => {
            expect(toPhonemes(
                "Are those shy Eurasian footwear, cowboy chaps, or jolly earthmoving headgear?"
            )).to.equal("");
        });


    it(
        "dinosaur"
        , () => {
            expect(toPhonemes(
                "The hungry purple dinosaur ate the kind, zingy fox, the jabbering crab, and the mad whale and started vending and quacking."
            )).to.equal("");
        });


    it(
        "for certain US accents and phonological analyses"
        , () => {
            expect(toPhonemes(
                "With tenure, Suzie’d have all the more leisure for yachting, but her publications are no good."
            )).to.equal("");
        });

    it("perfect for certain accents with the cot-caught merger", () => {
        expect(toPhonemes(
            "Shaw, those twelve beige hooks are joined if I patch a young, gooey mouth."
        )).to.equal("");
    });

    it("beige hue", () => {
        expect(toPhonemes(
            "The beige hue on the waters of the loch impressed all, including the French queen, before she heard that symphony again, just as young Arthur wanted."
        )).to.equal("");
    });


    it("should convert trill lyrics", () => {
        expect(toPhonemes(
            `supercalifragilisticexpialidocious`
            )
        ).to.equal("");
    });

    it("should convert trill lyrics", () => {
        expect(toPhonemes(
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
        ).to.equal("");
    });
});
