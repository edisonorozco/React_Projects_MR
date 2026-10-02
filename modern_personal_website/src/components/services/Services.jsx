import React, { useState } from 'react'
import './services.css'
import { useTranslation } from 'react-i18next';

const Services = () => {

    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const { t } = useTranslation();
    return (
        <section className="services section" id="services">
            <h2 className="section__title">{t('Services.services')}</h2>
            <span className="section__subtitle">{t('Services.desc')}</span>

            <div className="services__container container grid">
                <div className="services__content">
                    <div>
                        <i className="uil uil-web-grid services__icon"></i>
                        <h3 className="services__title">
                            Backend <br /> Developer</h3>
                    </div>

                    <span className="services__button" onClick={() => toggleTab(1)}>
                        {t('Services.viewMore')}
                        <i className="uil uil-arrow-right services__button-icon"></i></span>

                    <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                            <h3 className="services__modal-title">
                                Backend Developer
                            </h3>

                            <p className="services__modal-description">
                                {t('Services.backendDesc')}
                            </p>

                            <ul className="services__modal-services grid">

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.db')}
                                        </p>
                                    </i>
                                </li>

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.java')}
                                        </p>
                                    </i>
                                </li>

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.practices')}
                                        </p>
                                    </i>
                                </li>

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.linux')}
                                        </p>
                                    </i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="services__content">
                    <div>
                        <i className="uil uil-arrow services__icon"></i>
                        <h3 className="services__title">
                            Frontend <br /> Developer
                        </h3>
                    </div>

                    <span className="services__button" onClick={() => toggleTab(2)}>
                        {t('Services.viewMore')}
                        <i className="uil uil-arrow-right services__button-icon"></i></span>

                    <div className={toggleState === 2 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                            <h3 className="services__modal-title">
                                Frontend Developer
                            </h3>

                            <p className="services__modal-description">
                                {t('Services.frontendDesc')}
                            </p>

                            <ul className="services__modal-services grid">

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.fron')}
                                        </p>
                                    </i>
                                </li>

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.desktop')}
                                        </p>
                                    </i>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>

                <div className="services__content">
                    <div>
                        <i className="uil uil-edit services__icon"></i>
                        <h3 className="services__title">
                            DevOps <br /> Engineer
                        </h3>
                    </div>

                    <span className="services__button" onClick={() => toggleTab(3)}>
                        {t('Services.viewMore')}
                        <i className="uil uil-arrow-right services__button-icon"></i></span>

                    <div className={toggleState === 3 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i onClick={() => toggleTab(0)} className="uil uil-times services__modal-close"></i>

                            <h3 className="services__modal-title">
                                DevOps Engineer
                            </h3>

                            <p className="services__modal-description">
                                {t('Services.devopsDesc')}
                            </p>

                            <ul className="services__modal-services grid">

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.pipelines')}
                                        </p>
                                    </i>
                                </li>

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.aws')}
                                        </p>
                                    </i>
                                </li>

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.ascode')}
                                        </p>
                                    </i>
                                </li>

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.docker')}
                                        </p>
                                    </i>
                                </li>

                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon">
                                        <p className="services__modal-info">
                                            {t('Services.scrum')}
                                        </p>
                                    </i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default Services
