export default (eleventyConfig) => {

    eleventyConfig.addFilter("spanMe", (content) => <span>content</span>);

};
