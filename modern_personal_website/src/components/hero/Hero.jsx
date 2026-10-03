import React from 'react'
import { useTranslation } from 'react-i18next'
import './hero.css'
import photo from '../../assets/perfil.jpg'
import { profile } from '../../data/profile'
import KnowledgeBase from '../knowledgeBase/KnowledgeBase'

const Hero = () => {
    const { t } = useTranslation()

    return (
        <section className="hero container" aria-labelledby="hero-title">
            <div className="hero__main">
                <div className="hero__meta">
                    <img src={photo} alt={t('hero.photoAlt')} className="hero__photo" width="52" height="52" />
                    <div className="hero__meta-text mono">
                        <div>{t('hero.location')}</div>
                        <div><span className="dot hero__available-dot" /> {t('hero.available')}</div>
                    </div>
                </div>

                <h1 id="hero-title" className="hero__title">
                    {t('hero.titleA')}
                    <br />
                    <span className="hero__title-muted">{t('hero.titleB')}</span>
                </h1>

                <div className="hero__role">
                    <span className="hero__role-name">{t('hero.role')}</span>
                    <span className="hero__role-stack mono">{t('hero.stack')}</span>
                </div>

                <p className="hero__intro">{t('hero.intro')}</p>

                <div className="hero__links">
                    <a href="#projects" className="hero__link--accent">{t('hero.viewProjects')}</a>
                    <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                    {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
                    {profile.cv && <a href={profile.cv} download>{t('hero.cv')}</a>}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
            </div>

            <KnowledgeBase />
        </section>
    )
}

export default Hero
