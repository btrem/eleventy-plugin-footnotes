import footnoteSymbol from "./footnoteSymbol.js";
import { pluginConf } from "../index.js";
import { sprintf } from "sprintf-js";
import validateFootnoteNumber from "./validateFootnoteNumber.js";


/**
* Insert footnote reference marker in web content
*
* Optionally uses footnote symbols instead of arabic
* numerals, based on data item `useFootnoteSymbols`.
*
* @param {number} footnoteNumber - positive integer
* @returns {string|undefined} footnote reference markup,
* e.g. <sup><a id="ref-1" href="#note-1">1</a>.
* Format is customizable via template string.
* Returns empty string if footnoteNumber is invalid.
*/
const footnoteMarker = function (footnoteNumber) {

    let markup = "";

    if (validateFootnoteNumber(footnoteNumber)) {

        const defaults = {
            markerFormat: '<sup><a id="ref-%1$s" href="#note-%1$s">[%1$s]</a></sup>',
            useFootnoteSymbols: false,
        };

        // merge defaults with pluginConf
        const conf = {
            ...defaults,
            ...pluginConf,
        };

        // override with ctx values
        conf.markerFormat =
            this.ctx?.environments?.markerFormat ??
            this.ctx?.markerFormat ??
            conf.markerFormat
        ;

        conf.useFootnoteSymbols =
            this.ctx?.environments?.useFootnoteSymbols ??
            this.ctx?.useFootnoteSymbols ??
            conf.useFootnoteSymbols
        ;

        // TODO figure out why the @#!@?!&*! I can't
        // merge ctx

        // set note marker to either a symbol or number
        const marker = conf.useFootnoteSymbols ?
            footnoteSymbol(footnoteNumber) : footnoteNumber
        ;

        // create html markup using template string
        markup = sprintf(
            conf.markerFormat,
            marker
        );

    }

    return markup;
}


export default footnoteMarker;
