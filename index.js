import footnoteMarker from "./lib/footnoteMarker.js";
import footnoteSymbol from "./lib/footnoteSymbol.js";
import symbols from "./lib/symbols.json" with { type: "json" };

let pluginConfiguration;

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default (eleventyConfig, pluginConf = {}) => {

    const defaults = {
        symbols: symbols,
    };

    pluginConf = {
        ...defaults,
        ...pluginConf,
    };

    pluginConfiguration = pluginConf;

    // make footnote markers available in templates
    eleventyConfig.addGlobalData(
        "footnoteSymbols", pluginConf.symbols
    );

    eleventyConfig.addShortcode(
        "footnoteMarker", footnoteMarker
    );

    eleventyConfig.addFilter(
        "footnoteSymbol", footnoteSymbol
    );

};

export {
    footnoteMarker
};

export {
    pluginConfiguration as pluginConf
}
