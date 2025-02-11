// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const dotenv = require("dotenv"); // Import dotenv
dotenv.config(); // Load environment variables

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
// @ts-ignore
const config = {
  title: "Scaffold-Stark | Docs",
  tagline: "Open-source toolkit for building dapps",
  favicon: "img/icon-starknet.svg",

  // Set the production url of your site here
  url: "https://docs.scaffoldstark.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "scaffold-stark",
  projectName: "scaffold-Stark",

  scripts: [
    {
      src: "https://plausible.io/js/plausible.js",
      async: true,
      defer: true,
      "data-domain": "docs.scaffoldstark.com",
    },
  ],

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // sidebarCollapsible: false,
          sidebarCollapsed: true,
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Scaffold-Stark/ss2-docs/edit/main/",

          // TODO: reinstate once fixed
          exclude: ["**/StarknetContractWriteWithFeedback.md"],
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      colorMode: {
        respectPrefersColorScheme: true,
      },
      image: "img/icon-starknet.svg",
      navbar: {
        title: "Scaffold-Stark | Docs",
        logo: {
          alt: "scaffold-stark-logo",
          src: "img/logo-starknet.svg",
        },
        items: [
          {
            href: "https://github.com/Scaffold-Stark/ss2-docs",
            label: "GitHub Docs",
            position: "right",
          },
          {
            href: "https://github.com/Scaffold-Stark/scaffold-stark-2",
            label: "GitHub SS-2",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "GitHub",
            items: [
              {
                label: "Scaffold-Stark GitHub",
                href: "https://github.com/Scaffold-Stark/scaffold-stark-2",
              },
              {
                label: "Docs GitHub",
                href: "https://github.com/Scaffold-Stark/ss2-docs",
              },
            ],
          },
          {
            title: "Social",
            items: [
              {
                label: "Twitter",
                href: "https://x.com/ScaffoldStark",
              },
              {
                label: "Telegram",
                href: "https://t.me/+wO3PtlRAreo4MDI9",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Scaffold-Stark Docs. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      ...((process.env.ALGOLIA_SEARCH_ENABLED || "false") === "true"
        ? {
            algolia: {
              appId: process.env.ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_API_KEY,
              indexName: "scaffoldstark",
              rateLimit: 8,
              maxDepth: 10,
              startUrls: [`${process.env.SITE_URL}/`],
              sitemaps: [`${process.env.SITE_URL}/sitemap.xml`],
              ignoreCanonicalTo: true,
              discoveryPatterns: [`${process.env.SITE_URL}/**`],
              contextualSearch: true,
              actions: [
                {
                  indexName: "scaffoldstark",
                  pathsToMatch: [`${process.env.SITE_URL}/**`],
                  recordExtractor: ({ $, helpers }) => {
                    // priority order: deepest active sub list header -> navbar active item -> 'Documentation'
                    const lvl0 =
                      $(".menu__link.menu__link--sublist.menu__link--active, .navbar__item.navbar__link--active")
                        .last()
                        .text() || "Documentation";

                    return helpers.docsearch({
                      recordProps: {
                        lvl0: {
                          selectors: "",
                          defaultValue: lvl0,
                        },
                        lvl1: ["header h1", "article h1"],
                        lvl2: "article h2",
                        lvl3: "article h3",
                        lvl4: "article h4",
                        lvl5: "article h5, article td:first-child",
                        lvl6: "article h6",
                        content: "article p, article li, article td:last-child",
                      },
                      indexHeadings: true,
                      aggregateContent: true,
                      recordVersion: "v3",
                    });
                  },
                },
              ],
              initialIndexSettings: {
                scaffoldstark: {
                  attributesForFaceting: ["type", "lang", "language", "version", "docusaurus_tag"],
                  attributesToRetrieve: ["hierarchy", "content", "anchor", "url", "url_without_anchor", "type"],
                  attributesToHighlight: ["hierarchy", "content"],
                  attributesToSnippet: ["content:10"],
                  camelCaseAttributes: ["hierarchy", "content"],
                  searchableAttributes: [
                    "unordered(hierarchy.lvl0)",
                    "unordered(hierarchy.lvl1)",
                    "unordered(hierarchy.lvl2)",
                    "unordered(hierarchy.lvl3)",
                    "unordered(hierarchy.lvl4)",
                    "unordered(hierarchy.lvl5)",
                    "unordered(hierarchy.lvl6)",
                    "content",
                  ],
                  distinct: true,
                  attributeForDistinct: "url",
                  customRanking: ["desc(weight.pageRank)", "desc(weight.level)", "asc(weight.position)"],
                  ranking: ["words", "filters", "typo", "attribute", "proximity", "exact", "custom"],
                  highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
                  highlightPostTag: "</span>",
                  minWordSizefor1Typo: 3,
                  minWordSizefor2Typos: 7,
                  allowTyposOnNumericTokens: false,
                  minProximity: 1,
                  ignorePlurals: true,
                  advancedSyntax: true,
                  attributeCriteriaComputedByMinProximity: true,
                  removeWordsIfNoResults: "allOptional",
                  separatorsToIndex: "_",
                },
              },
            },
          }
        : {}),
    }),
};

module.exports = config;
