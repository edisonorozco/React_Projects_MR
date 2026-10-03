import React from 'react'
import './projects.css'
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import useList from '../../hooks/useList';
import { projectLinks } from '../../data/profile';
import profecanImg from '../../assets/projects/profecan.jpg'
import rionegroImg from '../../assets/projects/rionegro.jpg'

const IMAGES = { profecan: profecanImg, rionegro: rionegroImg };

const Projects = () => {
    const { t } = useTranslation();
    const list = useList();

    return (
        <section className="projects section" id="projects">
            <div className="container">
                <div className="section__head">
                    <span className="eyebrow">{t('Projects.eyebrow')}</span>
                    <h2 className="section__title">
                        {t('Projects.titleA')} <span>{t('Projects.titleB')}</span>
                    </h2>
                    <p className="section__desc">{t('Projects.desc')}</p>
                </div>

                <div className="projects__grid">
                    {list('Projects.items').map((project) => {
                        const link = projectLinks[project.linkId || project.image];
                        return (
                            <article className="projects__card card" key={project.title}>
                                {IMAGES[project.image] && (
                                    <img src={IMAGES[project.image]} alt={project.title} loading="lazy" className="projects__img" />
                                )}
                                <span className={`projects__status projects__status--${project.status}`}>
                                    {t(`Projects.status.${project.status}`)}
                                </span>
                                <h3 className="projects__title">{project.title}</h3>
                                <p className="projects__desc">{project.desc}</p>
                                <ul className="projects__tags">
                                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                                </ul>
                                {link && (
                                    <a href={link} target="_blank" rel="noreferrer" className="projects__link">
                                        {t(project.image ? 'Projects.visit' : 'Projects.view')} <Icon name="external" size={15} />
                                    </a>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Projects
