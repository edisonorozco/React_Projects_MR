import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// The JSON files are not content-hashed, so a browser could keep an old copy whose keys
// no longer match the code. A per-deploy version in the URL forces a fresh download.
const version = process.env.REACT_APP_GIT_SHA || 'dev';

i18n
    .use(Backend) // loads /locales/{lng}/translation.json
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        supportedLngs: ['es', 'en'],
        fallbackLng: 'es',
        nonExplicitSupportedLngs: true, // "es-CO" -> "es"
        load: 'languageOnly', // never request /locales/es-CO/... (there is no such file)
        backend: {
            loadPath: `/locales/{{lng}}/{{ns}}.json?v=${version}`,
        },
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
