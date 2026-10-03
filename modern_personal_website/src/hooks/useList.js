import { useTranslation } from 'react-i18next';

// Arrays from the translation files. Falls back to [] while translations are not loaded.
export const useList = (key) => {
    const { t } = useTranslation();
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? value : [];
};
