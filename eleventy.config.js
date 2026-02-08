// Make Markdown more feature rich. Similar to Obsidian-ish.
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

import katex from "katex";

import MarkdownIt from "markdown-it";

import markdownItEmojiCustomizer from 'markdown-it-emoji-customizer';


import sub from "markdown-it-sub";
import sup from "markdown-it-sup";
import mark from "markdown-it-mark";
import abbr from "markdown-it-abbr";
import footnote from "markdown-it-footnote";
import deflist from "markdown-it-deflist";

import htmlmin from "html-minifier-terser";

import CleanCSS from 'clean-css';
import fs from 'fs';

import Image from "@11ty/eleventy-img";


export default function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./style.css");
  // Markdown options
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,


  };

  const md = new MarkdownIt(options);
  const emojiOptions = {
    md, // the markdown-it instance (required!)
    emojiDir: './netherpi.net/assets/img/emoji/',
    baseUrl: '/assets/img/emoji/',
    mergeDefs: true,
    baseUnicodeEmojiSet: 'full',
    customEmojiImgAttributes: {},
    customEmojiSpanClass: 'custom-emoji--span',
    unicodeEmojiSpanClass: 'unicode-emoji--span',
    shortcuts: false,
    mergeShortcuts: true,
    // allowedEmoji: ,
  }
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(sub));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(sup));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(mark));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(abbr));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(footnote));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(deflist));
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(markdownItEmojiCustomizer, emojiOptions);

  eleventyConfig.setLibrary("md", md);
  // Katex filter $$$$
  eleventyConfig.addFilter("latex", (content) => {
    return content.replace(/\$\$(.+?)\$\$/g, (_, equation) => {
      const cleanEquation = equation.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

      return katex.renderToString(cleanEquation, { throwOnError: false });
    });
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
    // String conversion to handle `permalink: false`
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        collapseBooleanAttributes: true,
        continueOnParseError: true,
        decodeEntities: true,
        keepClosingSlash: true,
        minifyCSS: true,
        quoteCharacter: `"`,
        removeComments: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
      });

      return minified;
    }

    // If not an HTML output, return content as-is
    return content;
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);


  eleventyConfig.addShortcode("image", async function (src, alt, widths = [300, 600], sizes = "") {
    return Image(src, {
      widths,
      formats: ["avif", "jpeg"],
      returnType: "html",    // new in v6.0
      htmlOptions: {         // new in v6.0
        imgAttributes: {
          alt,               // required, though "" works fine
          sizes,             // required with more than one width, optional if single width output
          loading: "lazy",   // optional
          decoding: "async", // optional
        }
      }
    });
  });

  const inputFile = './main.css';
  const input = fs.readFileSync(inputFile, 'utf8');
  const output = new CleanCSS().minify(input);

  fs.writeFile('netherpi.net/css/main.css', output.styles, (err) => {
    if (err) return console.log('Error minifying main.css' + err);
    //success
  });
};

// Folders
export const config = {
  dir: {
    output: "netherpi.net",
  }
};
