import React from 'react'
import AboutImg from "../../assets/perfil.jpg"
import './about.css'
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import useList from '../../hooks/useList';

const About = () => {
    const { t } = useTranslation();
    const list = useList();

    return (
        <section className="about section" id='about'>
            <div className="about__container container">
                <div className="about__media">
                    <img src={AboutImg} alt="Edison Orozco" className="about__img" />
                </div>

                <div className="about__data">
                    <span className="eyebrow">{t('About.eyebrow')}</span>
                    <h2 className="section__title">
                        {t('About.titleA')} <span>{t('About.titleB')}</span>
                    </h2>

                    {list('About.paragraphs').map((paragraph) => (
                        <p className="about__description" key={paragraph}>{paragraph}</p>
                    ))}

                    <ul className="about__facts">
                        {list('About.facts').map((fact) => (
                            <li className="about__fact card" key={fact.label}>
                                <span className="icon-tile"><Icon name={fact.icon} size={16} /></span>
                                <div>
                                    <span className="about__fact-label">{fact.label}</span>
                                    <strong className="about__fact-value">{fact.value}</strong>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default About
