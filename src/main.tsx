
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import App from "./App.tsx";
import { ChefGenieLandingPage } from "./pages/ChefGenieLandingPage.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import "./index.css";

const normalizePath = (path: string) => {
  const cleaned = path.replace(/\/+$/, "");
  return cleaned || "/";
};

const getCurrentPath = () => {
  const hashValue = window.location.hash.slice(1);
  if (hashValue.startsWith("/")) {
    return normalizePath(hashValue);
  }

  return normalizePath(window.location.pathname);
};

function Root() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  useEffect(() => {
    const syncRoute = () => setCurrentPath(getCurrentPath());
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  if (currentPath === "/chefgenie") {
    return (
      <LanguageProvider>
        <ThemeProvider>
          <ChefGenieLandingPage />
        </ThemeProvider>
      </LanguageProvider>
    );
  }

  return <App />;
}

createRoot(document.getElementById("root")!).render(<Root />);
  
