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
          label: "🧠 Learning Hub",
          items: [
            { label: "💙 Flutter Null Safety", link: "/content/flutter/" },
            { label: "🤖 Belajar Programming AI", link: "/content/belajar-programming-ai-anak/" },
          ],
        },
      ],
    }),
  ],
});
