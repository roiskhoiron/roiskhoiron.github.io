import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "id" | "en" | "zh" | "ja";

export type LanguageOption = {
  code: Language;
  label: string;
  nativeLabel: string;
};

const STORAGE_KEY = "rk-language";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "id", label: "Indonesian", nativeLabel: "Indonesia" },
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  options: LanguageOption[];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "id" || saved === "en" || saved === "zh" || saved === "ja") {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: Language) => setLanguageState(nextLanguage),
      options: LANGUAGE_OPTIONS,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
