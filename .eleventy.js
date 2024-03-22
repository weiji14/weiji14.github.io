const activityPubPlugin = require('eleventy-plugin-activity-pub');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function (eleventyConfig) {
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
};
