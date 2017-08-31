import "mocha";
import {expect} from "chai";




describe("txt2pho", () => {
it(
        "fox"
        , () => {
"That quick beige fox jumped in the air over each thin dog. Look out, I shout, for he's foiled you again, creating chaos."
});

it(
        "perfect for certain Received Pronunciation accents"
        , () => {
"Are those shy Eurasian footwear, cowboy chaps, or jolly earthmoving headgear?"
});


it(
        "dinosaur"
        , () => {
"The hungry purple dinosaur ate the kind, zingy fox, the jabbering crab, and the mad whale and started vending and quacking."
});



it(
        "for certain US accents and phonological analyses"
        , () => {
"With tenure, Suzie’d have all the more leisure for yachting, but her publications are no good." 
});

it("perfect for certain accents with the cot-caught merger", () => {
"Shaw, those twelve beige hooks are joined if I patch a young, gooey mouth." 
});

"The beige hue on the waters of the loch impressed all, including the French queen, before she heard that symphony again, just as young Arthur wanted."
        it("should convert trill lyrics", () => {
            expect(
            convert(
`supercalifragilisticexpialidocious`
)
            ).to.equal("");
            
        it("should convert trill lyrics", () => {
            expect(
            convert(
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
