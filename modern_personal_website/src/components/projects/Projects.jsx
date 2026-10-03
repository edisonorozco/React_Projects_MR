import React from 'react'
import { useTranslation } from 'react-i18next'
import './projects.css'
import profecanImg from '../../assets/projects/profecan.jpg'
import rionegroImg from '../../assets/projects/rionegro.jpg'
import { profile, projectLinks } from '../../data/profile'
import { useList } from '../../hooks/useList'
import { SearchIcon } from '../ui/Icons'

const IMAGES = { profecan: profecanImg, rionegro: rionegroImg }

// Renders an <a> only when there is somewhere to go, so unfinished links don't look clickable.
const CardLink = ({ href, className, children }) => {
    if (!href) return <div className={className}>{children}</div>
    const external = href.startsWith('http')
    return (
        <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {children}
        </a>
    )
}

const Pipeline = () => {
    const steps = useList('projects.pipeline')
    return (
        <div className="pipeline mono zoom">
            {steps.map((step) => (
                <div key={step.name} className="pipeline__step">
                    <span className="pipeline__dot" />
                    <span className="pipeline__name">{step.name}</span>
                    <span className="pipeline__note">{step.note}</span>
                </div>
            ))}
        </div>
    )
}

const Projects = () => {
    const { t } = useTranslation()
    const items = useList('projects.items')

    return (
        <section id="projects" className="section" aria-labelledby="projects-title">
            <div className="container">
                <div className="section__head">
                    <div className="section__head-main">
                        <span className="section__label">{t('projects.label')}</span>
                        <h2 id="projects-title" className="section__title">{t('projects.title')}</h2>
                    </div>
                    <a href={profile.github} target="_blank" rel="noreferrer" className="projects__github">GitHub ↗</a>
                </div>

                <a href="#lab" className="featured lift reveal">
                    <div className="featured__visual" aria-hidden="true">
                        <div className="zoom featured__mock">
                            <div className="featured__search">
                                <SearchIcon />
                                <span>{t('projects.featured.query')}</span>
                            </div>
                            <div className="featured__results">
                                {[60, 50].map((width) => (
                                    <div key={width} className="featured__result">
                                        <span style={{ width: `${width}%` }} className="featured__bar featured__bar--title" />
                                        <span style={{ width: '90%' }} className="featured__bar" />
                                        <span style={{ width: '72%' }} className="featured__bar" />
                                    </div>
                                ))}
                            </div>
                            <div className="featured__flow mono">
                                react → lambda → langchain → <span className="featured__flow-hl">pgvector</span> → llm
                            </div>
                        </div>
                    </div>
                    <div className="featured__info">
                        <span className="status status--building">{t('projects.featured.status')}</span>
                        <h3 className="featured__title">{t('projects.featured.title')}</h3>
                        <p className="featured__line">{t('projects.featured.line')}</p>
                        <span className="featured__stack mono">{t('projects.featured.stack')}</span>
                        <span className="featured__cta">{t('projects.featured.cta')} <span className="arrow">→</span></span>
                    </div>
                </a>

                <div className="work-grid">
                    {items.map((item) => (
                        <CardLink key={item.id} href={projectLinks[item.id]} className="work lift reveal">
                            <div className="work__visual">
                                {IMAGES[item.id]
                                    ? <img src={IMAGES[item.id]} alt={item.alt} loading="lazy" />
                                    : <Pipeline />}
                            </div>
                            <div className="work__head">
                                <h3 className="work__title">{item.title}</h3>
                                {item.tag === 'LIVE'
                                    ? <span className="status status--live">{item.tag}</span>
                                    : <span className="work__tag mono">{item.tag}</span>}
                            </div>
                            <p className="work__line">{item.line}</p>
                        </CardLink>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
