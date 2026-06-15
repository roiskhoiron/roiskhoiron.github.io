// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightCatppuccin from "@catppuccin/starlight";

export default defineConfig({
  site: "https://roishoiron.github.io",
  base: "/articles",
  trailingSlash: "always",
  outDir: "./dist",
  integrations: [
    starlight({
      title: "CodingSkuy",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/roishoiron" }],
      plugins: [
        starlightCatppuccin({
          dark: { flavor: "mocha", accent: "mauve" },
          light: { flavor: "latte", accent: "mauve" },
        }),
      ],
      sidebar: [
        {
          label: "Articles",
          items: [{ autogenerate: { directory: "articles" } }],
        },
        {
          label: "Tutorials",
          items: [{ autogenerate: { directory: "tutorials" } }],
        },
      ],
    }),
  ],
});
