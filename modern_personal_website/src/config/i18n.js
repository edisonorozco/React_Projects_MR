import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend) // loads /locales/{lng}/translation.json
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        supportedLngs: ['es', 'en'],
        fallbackLng: 'es',
        nonExplicitSupportedLngs: true, // "es-CO" -> "es"
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false, // react already escapes
        },
    });

i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng.startsWith('en') ? 'en' : 'es';
});

export default i18n;
