import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from '../../public/locales/es/translation.json';
import en from '../../public/locales/en/translation.json';

// Synchronous i18n instance with the real translation files (the app loads them over HTTP).
i18n.use(initReactI18next).init({
    lng: 'es',
    fallbackLng: 'es',
    resources: { es: { translation: es }, en: { translation: en } },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

export { es, en };
export default i18n;
