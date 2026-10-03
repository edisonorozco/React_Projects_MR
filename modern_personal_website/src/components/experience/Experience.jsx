import React from 'react'
import { useTranslation } from 'react-i18next'
import './experience.css'
import { useList } from '../../hooks/useList'

const TOOLS = ['Java', 'Spring Boot', 'AWS', 'Angular', 'React', 'Docker', 'CI/CD', 'SQL']
const AI_TOOLS = ['LangChain', 'LangGraph', 'pgvector', 'Bedrock']

const Experience = () => {
    const { t } = useTranslation()
    const jobs = useList('experience.jobs')

    return (
        <section id="experience" className="section" aria-labelledby="experience-label">
            <div className="container section__grid">
                <h2 id="experience-label" className="section__label">{t('experience.label')}</h2>
                <div className="section__body experience">
                    <div className="reveal">
                        {jobs.map((job) => (
                            <div key={job.org} className="job">
                                <span className="job__org">{job.org}</span>
                                <span className="job__role">{job.role}</span>
                                <span className={`job__dates mono${job.current ? ' job__dates--current' : ''}`}>{job.dates}</span>
                            </div>
                        ))}
                    </div>

                    <div className="tools reveal">
                        <h3 className="eyebrow">{t('experience.toolsLabel')}</h3>
                        <ul className="tools__list">
                            {TOOLS.map((tool) => (
                                <li key={tool} className="chip">{tool}</li>
                            ))}
                            {AI_TOOLS.map((tool) => (
                                <li key={tool} className="chip chip--ai"><span className="dot" />{tool}</li>
                            ))}
                        </ul>
                        <p className="tools__legend"><span className="dot" /> {t('experience.learning')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
