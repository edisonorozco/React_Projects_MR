import React from 'react'
import './process.css'
import { useTranslation } from 'react-i18next';
import useList from '../../hooks/useList';
import { technologies } from '../../data/profile';

const Process = () => {
    const { t } = useTranslation();
    const list = useList();

    return (
        <section className="process" id="process">
            <div className="container">
                <div className="section__head process__head">
                    <h2 className="process__title">{t('Process.title')}</h2>
                    <p className="section__desc">{t('Process.desc')}</p>
                </div>

                <ol className="process__steps">
                    {list('Process.steps').map((step, index) => (
                        <li className="process__step card" key={step.title}>
                            <span className="process__number">{index + 1}</span>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </li>
                    ))}
                </ol>

                <div className="process__tech">
                    <h3 className="process__tech-title">{t('Process.techTitle')}</h3>
                    <ul className="process__chips">
                        {technologies.map((tech) => <li className="chip" key={tech}>{tech}</li>)}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Process
