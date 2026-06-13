import { useLanguage } from "../contexts/LanguageContext";
import { translations, type Translations } from "../pages/codingskuy/translations";

export function useT(): Translations {
  const { language } = useLanguage();
  return translations[language];
}
