import footnoteSymbol from "./footnoteSymbol.js";
import validateFootnoteNumber from "./validateFootnoteNumber.js";


/**
* Insert footnote reference marker in web content
*
* Optionally uses footnote symbols instead of arabic
* numerals, based on data item `useFootnoteSymbols`.
*
* @param {number} footnoteNumber - positive integer
* @returns {string|undefined} footnote reference markup
* with a link to the footnote, e.g. for a numbered
* footnote, <sup><a id="ref-1" href="#note-1">1</a>, and
* for a symbol, <sup><a id="ref-†" href="#note-†">†</a>.
* Returns undefined if footnoteNumber is invalid
*/
const footnoteMarker = function (footnoteNumber) {

    let markup = "";

    if (validateFootnoteNumber(footnoteNumber)) {

        // get data item useFootnoteSymbols from template
        // `ctx` (context), trying liquid first, then
        // nunjucks; if not found, set useFootnoteSymbols
        // to false
        const useFootnoteSymbol =
            this.ctx?.environments?.useFootnoteSymbols ??
            this.ctx?.useFootnoteSymbols ??
            false;

        // set note marker to either a symbol or number
        const marker = useFootnoteSymbol ? footnoteSymbol(footnoteNumber, this?.page?.inputPath) : footnoteNumber;

        markup = `<sup><a id="ref-${marker}" href="#note-${marker}">[${marker}]</a></sup>`;

    }

    return markup;
}


export default footnoteMarker;
