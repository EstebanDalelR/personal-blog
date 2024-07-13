import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Blog | Esteban Dalel R</span>,
  project: {
    link: "https://github.com/estebandalelr/personal-blog",
  },
  chat: {
    link: "https://x.com/estebandalelr",
  },
  docsRepositoryBase: "https://github.com/estebandalelr/personal-blog",
  footer: {
    text: "Blog | Esteban Dalel R",
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Blog | EstebanDalelR.co'
    }
  }
};

export default config;
