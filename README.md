Add footnotes to webpages in
[eleventy](https://www.11ty.dev/)
projects.
This is an alternative to
[markdown-it-footnote](https://www.npmjs.com/package/markdown-it-footnote).
Using this eleventy plugin, you can add footnotes to
a post outside of the content -- for example in its
[front matter](https://www.11ty.dev/docs/data-frontmatter/) --
giving you more flexibility for where those footnotes appear in web pages.

This project is beta.
Breaking changes prior to version 1.0.0 are possible.


## Installation

Install the module in your eleventy project using
npm with a git url:

`npm i git+https://github.com/btrem/eleventy-plugin-footnotes.git`

<aside>

The module is available only via GitHub for now.
When it's more stable, I'll add it to the npm registry.

</aside>

## Importing It in Eleventy:

### ES6 Syntax

```js
import footnotes from eleventy-plugin-footnotes;

export default function(eleventyConfig) {
    // config stuff...
}
```

### Common js Syntax

Import it _inside_ the main config function.
Use `default:` syntax, and use `await` on the import.
Also, since you're using `await`, make sure that the
config function is `async`:

```js
module.exports = async function (eleventyConfig) {
    const { default: footnotes } = await import("eleventy-plugin-footnotes");

    // other config stuff...
}
```

## Add the Plugin

```js
eleventyConfig.addPlugin(footnotes);
```

The footnotes plugin is now available in your
templates.


## Usage

The plugin adds

- a universal
[shortcode](https://www.11ty.dev/docs/shortcodes/)
called `footnoteMarker` that takes a number and returns
html markup for a footnote reference marker with a link to
a footnote (which you supply, e.g., in a layout); and
- a universal
[filter](https://www.11ty.dev/docs/filters/)
called `footnoteSymbol` that transforms a number to a
footnote symbol, e.g., 2 => †;

### Shortcode

Add a footnote marker using the `footnoteMarker` shortcode.
The format for markers is similar to
[Wikipedia](https://www.wikipedia.org/)'s:
they will be in a `<sup>`erscript element;
bracketed; and will include a link using a
[fragment id](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment),
suitable for linking to the footnote.

For example, the following template extract

```
Lorem ipsum dolor sit amet.{% footnoteMarker 1 %}
```

will produce this html fragment:

```html
Lorem ipsum dolor sit amet.<sup><a id="ref-1" href="#note-1">[1]</a>
```


### Filter

Change a footnote reference number to a symbol using
the `footnoteSymbol` filter. For example,
`{{ 1 | footnoteSymbol }}` produces
<samp>✲</samp>; `{{ 2 | footnoteSymbol }}` produces
<samp>†</samp>; etc.

### Symbols

The plugin uses a list of twenty footnote symbols:
✲, †, ‡, §, ‖, ¶, ⹋, ⸸, ⁑, ⁂, ✪, ❡, ✦, ❀, ❅, ♠, ♣, ♥, ♦, ❖.

The first six are
[standardized footnote symbols](https://en.wikipedia.org/wiki/Note_(typography)#Numbering_and_symbols),
although two are slightly modified.
See "Symbol Modifications" below for more.
The remaining symbols are either variations of the first six --
e.g., a double asterisk, an inverted dagger, etc. -- or
are symbols that look like they would work as markers.

#### Symbol Modifications

##### Asterisks in Markdown

The standard asterisk (Unicode U+002A) can cause problems in markdown
if it appears at the beginning of a line, because markdown treats an
asterisk in that place as an unordered list item.
So this template extract

```
{{ 1 | footnoteSymbol }} Eleventy (software). In Wikipedia.
https://en.wikipedia.org/wiki/Eleventy_(software)
```

would produce this output


```
* Eleventy (software). In Wikipedia. https://en.wikipedia.org/wiki/Eleventy_(software)
```

which would become this html:

```html
<ul>
    <li>
        Lorem ipsum. In Wikipedia. https://en.wikipedia.org/wiki/Lorem_ipsum
    </li>
</ul>
```

Note that the asterisk has been removed, replaced by `<ul>` markup.
Not the desired result.

This might be an edge case, but nonetheless, the plugin uses
an "open center" asterisk (Unicode U+2732), in place of the standard one.

##### Verical Bars

It's probably more common to use the vertical bar
(Unicode U+007C), entered twice, ||, as a footnote symbol.
However, all of the other symbols in the list are single
characters glyphs.
Thus, for the sake of consistency, the plugin uses the single
character glyph ‖ (double vertical line, Unicode U+2016).
