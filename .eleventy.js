module.exports = function(config) {
  config.addPassthroughCopy("_site/fonts");
  config.addPassthroughCopy("_site/images");
  config.addPassthroughCopy("_site/styles");
  config.addPassthroughCopy("_site/scripts");
  config.addPassthroughCopy("_site/*.ico");
  config.addPassthroughCopy("_site/*.txt");

  // disable live reloading because it inteferes with local performance testing
  config.setBrowserSyncConfig({
		snippet: false
  })

  return {
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    dir: {
      input: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
      output: "dist",
    },
  };
};
