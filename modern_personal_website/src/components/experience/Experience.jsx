import React from 'react'
import './experience.css'
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import useList from '../../hooks/useList';

const Timeline = ({ icon, title, items }) => (
    <div className="experience__column card">
        <h3 className="experience__column-title">
            <span className="icon-tile"><Icon name={icon} size={16} /></span>
            {title}
        </h3>
        <ol className="experience__list">
            {items.map((item) => (
                <li className="experience__item" key={item.role + item.company}>
                    <span className="experience__period">{item.period}</span>
                    <h4 className="experience__role">{item.role}</h4>
                    <p className="experience__company">{item.company}</p>
                </li>
            ))}
        </ol>
    </div>
)

const Experience = () => {
    const { t } = useTranslation();
    const list = useList();

    return (
        <section className="experience section" id="experience">
            <div className="container">
                <div className="section__head">
                    <span className="eyebrow">{t('Experience.eyebrow')}</span>
                    <h2 className="section__title">
                        {t('Experience.titleA')} <span>{t('Experience.titleB')}</span>
                    </h2>
                </div>

                <div className="experience__grid">
                    <Timeline icon="briefcase" title={t('Experience.jobs')} items={list('Experience.jobsList')} />
                    <Timeline icon="graduation" title={t('Experience.education')} items={list('Experience.educationList')} />
                </div>
            </div>
        </section>
    )
}

export default Experience
