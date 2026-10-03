import React from 'react'
import './services.css'
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import useList from '../../hooks/useList';

const Services = () => {
    const { t } = useTranslation();
    const list = useList();

    return (
        <section className="services section" id="services">
            <div className="container">
                <div className="section__head">
                    <span className="eyebrow">{t('Services.eyebrow')}</span>
                    <h2 className="section__title">
                        {t('Services.titleA')} <span>{t('Services.titleB')}</span>
                    </h2>
                    <p className="section__desc">{t('Services.desc')}</p>
                </div>

                <div className="services__grid">
                    {list('Services.items').map((service) => (
                        <article className="services__card card" key={service.title}>
                            <span className="icon-tile"><Icon name={service.icon} /></span>
                            <h3 className="services__title">{service.title}</h3>
                            <p className="services__desc">{service.desc}</p>
                            <ul className="services__bullets">
                                {service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                            </ul>
                            <a href="#contact" className="services__quote">
                                {t('Services.quote')}
                                <Icon name="arrowRight" size={16} />
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
