import "@/codingskuy.css";
import CodingSkuyApp from "@/apps/codingskuy/App";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function CodingSkuyLandingPage() {
  return (
    <>
      <div className="fixed top-4 right-4 z-[100]">
        <LanguageSwitcher />
      </div>
      <CodingSkuyApp />
    </>
  );
}
