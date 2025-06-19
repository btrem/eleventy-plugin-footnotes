Add footnote markers to template output in
[eleventy](https://www.11ty.dev/)
projects.

Useful for setups where you need to put footnote markers
in your content, but want the footnotes themselves to
appear _outside_ of that content.

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

Use the
[`addPlugin` method](https://www.11ty.dev/docs/create-plugin/)
in your
[eleventy configuration](https://www.11ty.dev/docs/config/)
file:

```js
eleventyConfig.addPlugin(footnotes);
```

The footnotes plugin is now available in your templates.


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
The default format for markers is similar to
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


## Roadmap

- Add includes/partials/macros to output footnotes.
Depends on expanding
[virtual templates](https://www.11ty.dev/docs/virtual-templates/)
to add support for includes.
Follow along at
[issue 3501](https://github.com/11ty/eleventy/issues/3501)
or
[issue 3768](https://github.com/11ty/eleventy/discussions/3768).


## Maintainer

[Brian Tremblay](https://github.com/btrem)
