import htmlmin from "html-minifier-terser";

export const config = {
    dir: {
        // Directories
        input: "content",
        output: "netherpi.net",
        includes: "_includes",
    },
};

export default function (eleventyConfig) {
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addTransform("htmlmin", function (content) {
        // Ignore .gitignore
        eleventyConfig.setUseGitIgnore(false);
        // String conversion to handle `permalink: false`
        if ((this.page.outputPath || "").endsWith(".html")) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });

            return minified;
        }

        // If not an HTML output, return content as-is
        return content;
    });
}
