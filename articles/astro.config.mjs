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
          label: "🌱 Mulai Belajar",
          items: [
            { label: "Apa itu Pemrograman?", link: "/mulai/apa-itu-pemrograman/" },
            { label: "Cara Belajar Coding", link: "/mulai/cara-belajar-coding/" },
            { label: "Roadmap Developer", link: "/mulai/roadmap-developer/" },
          ],
        },
        {
          label: "📱 Flutter",
          items: [
            { label: "Null Safety", link: "/flutter/null-safety/" },
            { label: "Widget", link: "/flutter/widget/" },
            { label: "State Management", link: "/flutter/state-management/" },
            { label: "REST API", link: "/flutter/rest-api/" },
            { label: "Firebase", link: "/flutter/firebase/" },
            { label: "Deployment", link: "/flutter/deployment/" },
          ],
        },
        {
          label: "🐍 Python",
          items: [
            { label: "Python Developer", link: "/python/developer/" },
          ],
        },
        {
          label: "🤖 AI",
          items: [
            { label: "AI Fundamentals", link: "/ai/ai-fundamentals/" },
            { label: "AI Agent", link: "/ai/ai-agent/" },
            { label: "MCP Server", link: "/ai/mcp-server/" },
            { label: "RAG", link: "/ai/rag/" },
            { label: "Prompt Engineering", link: "/ai/prompt-engineering/" },
          ],
        },
        {
          label: "🏗️ Backend",
          items: [
            { label: "REST API", link: "/backend/rest-api/" },
            { label: "Database", link: "/backend/database/" },
            { label: "Authentication", link: "/backend/authentication/" },
            { label: "WebSocket", link: "/backend/websocket/" },
            { label: "System Design", link: "/backend/system-design/" },
          ],
        },
        {
          label: "💼 Karir",
          items: [
            { label: "Menjadi Mobile Developer", link: "/karir/menjadi-mobile-developer/" },
            { label: "Mobile di Era AI", link: "/karir/mobile-di-era-ai/" },
            { label: "Portfolio", link: "/karir/portfolio/" },
            { label: "CV", link: "/karir/cv/" },
            { label: "Interview", link: "/karir/interview/" },
          ],
        },
        { label: "🧪 Playground", link: "/playground/" },
        { label: "🚀 Projects", link: "/projects/" },
        { label: "🙋 Tentang Saya", link: "/tentang/" },
      ],
    }),
  ],
});
