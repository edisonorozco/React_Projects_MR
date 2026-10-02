import React from 'react'
import { useTranslation } from 'react-i18next';

const DevOps = () => {
    const { t } = useTranslation();
    return (
        <div className="skills__content">
            <h3 className="skills__title">{t('Skill.devOps')}</h3>
            <div className="skills__box">
                <div className="skills__group">

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">Pipelines</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">AWS</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">{t('Skill.infra')}</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                </div>

                <div className="skills__group">

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">Kubernetes</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">Git</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">Docker</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DevOps
