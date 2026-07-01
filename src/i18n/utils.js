import { translations } from "./translations";

export const LANGUAGES = ["sv", "en", "es"];
export const DEFAULT_LANG = "sv";

export function getLangPaths() {
  return LANGUAGES.map((lang) => ({ params: { lang } }));
}

export function useTranslations(lang) {
  const activeLang = LANGUAGES.includes(lang) ? lang : DEFAULT_LANG;

  return function t(section, key) {
    if (key === undefined) {
      return (
        translations[activeLang]?.[section] ??
        translations[DEFAULT_LANG]?.[section] ??
        {}
      );
    }
    return (
      translations[activeLang]?.[section]?.[key] ??
      translations[DEFAULT_LANG]?.[section]?.[key] ??
      key
    );
  };
}

export function switchLangPath(currentPath, targetLang) {
  const parts = currentPath.split("/").filter(Boolean);
  if (LANGUAGES.includes(parts[0])) {
    parts[0] = targetLang;
  } else {
    parts.unshift(targetLang);
  }
  return "/" + parts.join("/") + "/";
}
