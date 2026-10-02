import React from 'react'
import './skills.css'
import DevOps from "./DevOps"
import Fullstack from "./Fullstack"
import { useTranslation } from 'react-i18next';

const Skills = () => {
    const { t } = useTranslation();
    return (
        <section className="skills section" id="skills">
            <h2 className="section__title">{t('Skill.skill')}</h2>
            <span className="section__subtitle">{t('Skill.description')}</span>

            <div className="skills__container container grid">

                <Fullstack />

                <DevOps />

            </div>
        </section>
    )
}

export default Skills
