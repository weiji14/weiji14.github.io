const activityPubPlugin = require('eleventy-plugin-activity-pub');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const slugify = require('@sindresorhus/slugify');

module.exports = function (eleventyConfig) {
  // Options for the `markdown-it` library
  const markdownItOptions = {
    html: true,
  }
  // Options for the `markdown-it-anchor` library
  const markdownItAnchorOptions = {
    permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
    slugify: s => slugify(s, {decamelize: false})
  }
  //
  const markdownLib = markdownIt(markdownItOptions).use(
    markdownItAnchor,
    markdownItAnchorOptions
  )
  eleventyConfig.setLibrary("md", markdownLib)

  // Add plugins
  eleventyConfig.addPlugin(activityPubPlugin, {
    domain: 'weiji14.github.io',
    username: 'weblog',
    displayName: "Wei Ji's technical blog",
    summary: 'Technical blog posts on building next generation geospatial data science tools!',
    outbox: true,
    outboxCollection: 'post'
	});
  eleventyConfig.addPlugin(lazyImagesPlugin);
  eleventyConfig.addPlugin(pluginRss);
};
