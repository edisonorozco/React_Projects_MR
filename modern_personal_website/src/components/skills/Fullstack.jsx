import React from 'react'
import { useTranslation } from 'react-i18next';

const FullStack = () => {
    const { t } = useTranslation();
    return (
        <div className="skills__content">
            <h3 className="skills__title">{t('Skill.fullStack')}</h3>
            <div className="skills__box">
                <div className="skills__group">

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">Java</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">Spring boot</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">React</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                </div>

                <div className="skills__group">

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">JavaScript</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">Phyton</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                    <div className="skills__data">
                        <i class='bx bx-badge-check' ></i>
                        <div>
                            <h3 className="skills__name">SQL</h3>
                            <span className="skills__level">{t('Skill.level')}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FullStack
