import "mocha";
import {expect} from "chai";




describe("txt2pho", () => {

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
