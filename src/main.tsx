
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChefGenieLandingPage } from "./pages/ChefGenieLandingPage.tsx";
import "./index.css";

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
const page = currentPath === "/chefgenie" ? <ChefGenieLandingPage /> : <App />;

createRoot(document.getElementById("root")!).render(page);
  
