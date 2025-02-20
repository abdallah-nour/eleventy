const urlFilter = require("./Filters/Url");
const serverlessUrlFilter = require("./Filters/ServerlessUrl");
const slugFilter = require("./Filters/Slug");
const slugifyFilter = require("./Filters/Slugify");
const getLocaleCollectionItem = require("./Filters/GetLocaleCollectionItem");

module.exports = function (config) {
  let templateConfig = this;

  config.addFilter("slug", slugFilter);
  config.addFilter("slugify", slugifyFilter);

  config.addFilter("url", function (url, pathPrefixOverride) {
    let pathPrefix = pathPrefixOverride || templateConfig.getPathPrefix();
    return urlFilter.call(this, url, pathPrefix);
  });
  config.addFilter("log", (input, ...messages) => {
    console.log(input, ...messages);
    return input;
  });

  config.addFilter("serverlessUrl", serverlessUrlFilter);

  config.addFilter(
    "getPreviousCollectionItemForCurrentPage",
    function (collection, langCode) {
      return getLocaleCollectionItem.call(
        this,
        config,
        collection,
        null,
        langCode,
        -1
      );
    }
  );

  config.addFilter(
    "getNextCollectionItemForCurrentPage",
    function (collection, langCode) {
      return getLocaleCollectionItem.call(
        this,
        config,
        collection,
        null,
        langCode,
        1
      );
    }
  );

  config.addFilter(
    "getCollectionItem",
    function (collection, pageOverride, langCode) {
      return getLocaleCollectionItem.call(
        this,
        config,
        collection,
        pageOverride,
        langCode,
        0
      );
    }
  );
  config.addFilter(
    "getPreviousCollectionItem",
    function (collection, pageOverride, langCode) {
      return getLocaleCollectionItem.call(
        this,
        config,
        collection,
        pageOverride,
        langCode,
        -1
      );
    }
  );
  config.addFilter(
    "getNextCollectionItem",
    function (collection, pageOverride, langCode) {
      return getLocaleCollectionItem.call(
        this,
        config,
        collection,
        pageOverride,
        langCode,
        1
      );
    }
  );

  return {
    templateFormats: [
      "liquid",
      "ejs",
      "md",
      "hbs",
      "mustache",
      "haml",
      "pug",
      "njk",
      "html",
      "11ty.js",
    ],
    // if your site lives in a subdirectory, change this
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: false, // change in 1.0
    htmlOutputSuffix: "-o",
    jsDataFileSuffix: ".11tydata",
    keys: {
      package: "pkg",
      layout: "layout",
      permalink: "permalink",
      permalinkRoot: "permalinkBypassOutputDir",
      engineOverride: "templateEngineOverride",
      computed: "eleventyComputed",
    },
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // deprecated, use config.addHandlebarsHelper
    handlebarsHelpers: {},
    // deprecated, use config.addNunjucksFilter
    nunjucksFilters: {},
  };
};
