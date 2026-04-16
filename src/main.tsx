
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChefGenieLandingPage } from "./pages/ChefGenieLandingPage.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import "./index.css";

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
const page =
  currentPath === "/chefgenie" ? (
    <LanguageProvider>
      <ThemeProvider>
        <ChefGenieLandingPage />
      </ThemeProvider>
    </LanguageProvider>
  ) : (
    <App />
  );

createRoot(document.getElementById("root")!).render(page);
  
