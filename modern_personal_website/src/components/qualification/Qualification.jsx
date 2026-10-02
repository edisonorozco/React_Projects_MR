import React from 'react'
import './qualification.css'
import { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Qualification = () => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const { t } = useTranslation();

    return (
        <section className="qualification section" id="qualification">
            <h2 className="section__title">{t('Qualification.qualification')}</h2>
            <span className="section__subtitle">{t('Qualification.journey')}</span>

            <div className="qualification__container container">
                <div className="qualification__tabs">
                    <div className={toggleState === 1
                        ? "qualification__button qualification__active button--flex"
                        : "qualification__button button--flex"}
                        onClick={() => toggleTab(1)}
                    >
                        <i className="uil uil-graduation-cap qualification__icon">

                        </i>{t('Qualification.education')}
                    </div>

                    <div className={toggleState === 2
                        ? "qualification__button qualification__active button--flex"
                        : "qualification__button button--flex"}
                        onClick={() => toggleTab(2)}>
                        <i className="uil uil-briefcase-alt qualification__icon">

                        </i>{t('Qualification.job')}
                    </div>
                </div>

                <div className="qualification__sections">
                    <div className={toggleState === 1
                        ? "qualification__content qualification__content-active"
                        : "qualification__content"}>
                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">{t('Qualification.ing')}</h3>
                                <span className="qualification__subtitle">Colombia -
                                    Corporación universitaria Remington</span>
                                <div className="qualifiaction__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2020 - 2023
                                </div>
                            </div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                        </div>

                        <div className="qualification__data">

                            <div></div>

                            <div>
                                <span className="qualification__rounder"></span>
                            </div>

                            <div>
                                <h3 className="qualification__title">{t('Qualification.tec')}</h3>
                                <span className="qualification__subtitle">Colombia - SENA</span>
                                <div className="qualifiaction__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2014 - 2017
                                </div>
                            </div>
                        </div>


                    </div>

                    {/** ============================== EXPERIENCE ================================== */}

                    <div className={toggleState === 2
                        ? "qualification__content qualification__content-active"
                        : "qualification__content"}>
                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">{t('Qualification.exp5')}</h3>
                                <span className="qualification__subtitle">Tech and Solve</span>
                                <div className="qualifiaction__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2021 - Present
                                </div>
                            </div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                        </div>

                        <div className="qualification__data">

                            <div></div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                            <div>
                                <h3 className="qualification__title">{t('Qualification.exp2')}</h3>
                                <span className="qualification__subtitle">Colombia - CODALTEC - Corporación de Alta Tecnología para la defensa</span>
                                <div className="qualifiaction__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2020 - 2021
                                </div>
                            </div>
                        </div>

                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">{t('Qualification.exp2')}</h3>
                                <span className="qualification__subtitle">Colombia - Corporación de la industria Aeronáutica Colombiana</span>
                                <div className="qualifiaction__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2019 - 2019
                                </div>
                            </div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                        </div>

                        <div className="qualification__data">

                            <div></div>

                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>

                            <div>
                                <h3 className="qualification__title">{t('Qualification.exp2')}</h3>
                                <span className="qualification__subtitle">Colombia - Inter-telco</span>
                                <div className="qualifiaction__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2019- 2019
                                </div>
                            </div>
                        </div>

                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">{t('Qualification.exp1')}</h3>
                                <span className="qualification__subtitle">Colombia - Fundación FES</span>
                                <div className="qualifiaction__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2017 - 2018
                                </div>
                            </div>

                            <div>
                                <span className="qualification__rounder"></span>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Qualification
