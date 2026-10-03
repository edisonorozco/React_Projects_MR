import React from 'react'
import { useTranslation } from 'react-i18next'
import './services.css'
import { useList } from '../../hooks/useList'
import { AppIcon, AutomationIcon, ChatIcon, WebIcon } from '../ui/Icons'

const ICONS = { web: WebIcon, app: AppIcon, auto: AutomationIcon, ai: ChatIcon }

const Services = () => {
    const { t } = useTranslation()
    const items = useList('services.items')
    const steps = useList('services.steps')

    return (
        <section id="services" className="services" aria-labelledby="services-title">
            <div className="container">
                <div className="section__head services__head">
                    <div className="section__head-main">
                        <span className="section__label">{t('services.label')}</span>
                        <h2 id="services-title" className="section__title services__title">{t('services.title')}</h2>
                    </div>
                    <a href="#contact" className="btn services__cta">{t('services.cta')}</a>
                </div>

                <ul className="services__grid">
                    {items.map((item, index) => {
                        const Icon = ICONS[item.icon] || WebIcon
                        return (
                            <li key={item.title} className="service reveal">
                                <span className="service__icon"><Icon size={20} strokeWidth={1.7} /></span>
                                <span className="service__num mono">{String(index + 1).padStart(2, '0')}</span>
                                <h3 className="service__title">{item.title}</h3>
                                <p className="service__line">{item.line}</p>
                            </li>
                        )
                    })}
                </ul>

                <div className="steps reveal">
                    <h3 className="eyebrow steps__label">{t('services.howLabel')}</h3>
                    <ol className="steps__list">
                        {steps.map((step, index) => (
                            <li key={step.title} className="step">
                                <div className="step__track">
                                    <span className="step__num mono">{index + 1}</span>
                                    <span className="step__line" />
                                </div>
                                <span className="step__title">{step.title}</span>
                                <span className="step__text">{step.line}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}

export default Services
