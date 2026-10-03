import { useTranslation } from 'react-i18next';

/* Returns a translated array (e.g. a list of cards), or [] while translations load */
const useList = () => {
    const { t } = useTranslation();
    return (key) => {
        const value = t(key, { returnObjects: true });
        return Array.isArray(value) ? value : [];
    };
};

export default useList;
