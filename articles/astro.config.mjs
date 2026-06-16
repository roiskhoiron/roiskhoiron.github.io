// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://roishoiron.github.io",
  base: "/articles",
  trailingSlash: "always",
  outDir: "./dist",
  integrations: [
    starlight({
      title: "CodingSkuy",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/roiskhoiron" }],
      customCss: ["./src/styles/theme.css"],
      sidebar: [
        { label: "🏠 Beranda", link: "/" },
        {
          label: "📖 Mulai Belajar",
          items: [{ autogenerate: { directory: "mulai" } }],
        },
        {
          label: "💙 Flutter",
          collapsed: true,
          items: [{ autogenerate: { directory: "flutter" } }],
        },
        {
          label: "🤖 AI",
          collapsed: true,
          items: [{ autogenerate: { directory: "ai" } }],
        },
        {
          label: "💼 Karir",
          collapsed: true,
          items: [{ autogenerate: { directory: "karir" } }],
        },
        {
          label: "🎯 Tutorial",
          collapsed: true,
          items: [{ autogenerate: { directory: "tutorial" } }],
        },
      ],
    }),
  ],
});
