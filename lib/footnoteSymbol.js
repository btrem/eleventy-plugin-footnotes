import footnoteSymbols from "./symbols.json" with { type: "json" }
import validateFootnoteNumber from "./validateFootnoteNumber.js";

/**
* Get symbol for footnote reference
*
* @param {number} [footnoteNumber] - positive integer
* @returns {string | number} footnote reference symbol,
* e.g. †, ‡, etc., or number if symbols list is exhausted.
*/
const footnoteSymbol = function (footnoteNumber) {

    if (validateFootnoteNumber(footnoteNumber)) {

        if (footnoteNumber > footnoteSymbols.length) {
            console.warn(
                "Warning: footnote number",
                footnoteNumber,
                "is too large to display a symbol.",
                "(There are only",
                footnoteSymbols.length,
                "symbols available.)",
                "Using the footnote number instead.",
            );
            return footnoteNumber;
        }

        // Footnote numbering begins with 1, so use
        // number - 1 to get symbol from 0-indexed array
        return footnoteSymbols[footnoteNumber - 1];

    }

};


export default footnoteSymbol;
