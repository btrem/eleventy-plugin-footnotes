export default (eleventyConfig) => {

    eleventyConfig.addFilter("foo", (content) => `<span>${content}</span> with foo!`);

};
