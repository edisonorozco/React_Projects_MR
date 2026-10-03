import React from 'react'
import { useTranslation } from 'react-i18next'
import './about.css'
import { useList } from '../../hooks/useList'

const About = () => {
    const { t } = useTranslation()
    const timeline = useList('about.timeline')

    return (
        <section id="about" className="section" aria-labelledby="about-label">
            <div className="container section__grid">
                <h2 id="about-label" className="section__label">{t('about.label')}</h2>
                <div className="section__body about">
                    <p className="about__statement reveal">
                        {t('about.statementA')} <span className="about__statement-muted">{t('about.statementB')}</span>
                    </p>

                    <ol className="timeline reveal" aria-label={t('about.timelineLabel')}>
                        {timeline.map((step) => (
                            <li key={step.year} className={`timeline__step${step.now ? ' timeline__step--now' : ''}`}>
                                <div className="timeline__track">
                                    <span className="timeline__dot" />
                                    <span className="timeline__line" />
                                </div>
                                <span className="timeline__year mono">{step.year}</span>
                                <span className="timeline__title">{step.title}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}

export default About
