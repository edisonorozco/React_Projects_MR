import React from 'react';
import './home.css'
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import useList from '../../hooks/useList';
import Avatar from '../../assets/avatar.jpg'
import { profile } from '../../data/profile';
import { openChat } from '../chat/ChatWidget';

const companies = ['Bancolombia', 'Tech and Solve','CODALTEC', 'CIAC', 'Inter-telco', 'Fundación FES'];

const Home = () => {
    const { t } = useTranslation();
    const list = useList();

    return (
        <section className="home" id='home'>
            <div className="home__container container">
                <span className="eyebrow">
                    <span className="home__dot" aria-hidden="true"></span>
                    {t('Home.badge')}
                </span>

                <p className="home__greeting">{t('Home.greeting')}</p>
                <h1 className="home__title">
                    {t('Home.titleA')} <span>{t('Home.titleB')}</span>
                </h1>
                <p className="home__description">{t('Home.description')}</p>

                <div className="home__buttons">
                    <a href="#projects" className="button">{t('Home.ctaWork')}</a>
                    <a href="#contact" className="button button--outline">{t('Home.ctaContact')}</a>
                    <button type="button" className="button button--outline" onClick={openChat}>
                        <Icon name="message" size={16} />
                        {t('Home.ctaAssistant')}
                    </button>
                </div>

                <div className="home__meta">
                    <img src={Avatar} alt="Edison Orozco" className="home__avatar" />
                    <div>
                        <strong>{t('Home.since')}</strong>
                        <span className="home__location">
                            <Icon name="pin" size={13} /> {t('Home.location')}
                        </span>
                    </div>
                    <span className="home__divider" aria-hidden="true"></span>
                    <div className="home__social">
                        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                            <Icon name="github" />
                        </a>
                        {profile.linkedin && (
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <Icon name="linkedin" />
                            </a>
                        )}
                        <a href={`mailto:${profile.email}`} aria-label="Email">
                            <Icon name="mail" />
                        </a>
                    </div>
                </div>

                <div className="home__features">
                    {list('Home.features').map((feature) => (
                        <div className="home__feature card" key={feature.title}>
                            <span className="icon-tile"><Icon name={feature.icon} /></span>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="home__trusted">
                    <p>{t('Home.trusted')}</p>
                    <ul>
                        {companies.map((company) => <li key={company}>{company}</li>)}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Home
