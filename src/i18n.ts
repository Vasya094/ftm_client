import i18n from "i18next"
import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import Cache from "i18next-localstorage-cache"
import { initReactI18next } from "react-i18next"

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(Cache)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar", "ru"],
    fallbackLng: "ru",
    debug: true,
    detection: {
      order: ["path", "htmlTag", "localStorage", "queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
