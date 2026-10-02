import React from 'react'
import { useTranslation } from 'react-i18next';

const Info = () => {
    const { t } = useTranslation();
    return (
        <div className="about__info grid">
            <div className="about__box">
                <i class='bx bx-award about__icon'></i>
                <h3 className="about__title">{t('About.experience')}</h3>
                <span className="about__subtitle">{t('About.experienceYears')}</span>
            </div>

            <div className="about__box">
                <i class='bx bx-briefcase-alt about__icon' ></i>
                <h3 className="about__title">{t('About.projects')}</h3>
                <span className="about__subtitle">{t('About.projectCount')}</span>
            </div>

            <div className="about__box">
                <i class='bx bx-support about__icon' ></i>
                <h3 className="about__title">{t('About.support')}</h3>
                <span className="about__subtitle">{t('About.supporOnline')}</span>
            </div>
        </div>
    )
}

export default Info
