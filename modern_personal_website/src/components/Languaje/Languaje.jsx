import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import './languaje.css'

const lngs = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'es', label: 'ES', name: 'Español' }
];

const Languaje = () => {
    const { i18n } = useTranslation();
    const current = (i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2);

    useEffect(() => {
        document.documentElement.lang = current;
    }, [current]);

    return (
        <div className="lang" role="group" aria-label="Language">
            {lngs.map((lng) => (
                <button
                    key={lng.code}
                    title={lng.name}
                    className={current === lng.code ? 'lang__button lang__button--active' : 'lang__button'}
                    aria-pressed={current === lng.code}
                    onClick={() => i18n.changeLanguage(lng.code)}
                >
                    {lng.label}
                </button>
            ))}
        </div>
    )
}

export default Languaje
