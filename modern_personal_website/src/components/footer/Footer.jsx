import React from 'react'
import './footer.css'
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import { profile } from '../../data/profile';

const links = ['about', 'services', 'projects', 'experience', 'contact'];

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer__container container">
                <a href="#home" className="nav__logo">
                    <span className="nav__logo-mark">EO</span>
                    Edison Orozco
                </a>

                <ul className="footer__list">
                    {links.map((id) => (
                        <li key={id}>
                            <a href={`#${id}`} className="footer__link">{t(`Header.${id}`)}</a>
                        </li>
                    ))}
                </ul>

                <div className="footer__social">
                    <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                        <Icon name="github" />
                    </a>
                    {profile.linkedin && (
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <Icon name="linkedin" />
                        </a>
                    )}
                    <a href="https://www.instagram.com/edison.orozco.c/" target="_blank" rel="noreferrer" aria-label="Instagram">
                        <Icon name="instagram" />
                    </a>
                </div>
            </div>

            <div className="footer__bottom container">
                <span>&#169; {new Date().getFullYear()} Edison Orozco · Software Masters. {t('Footer.rights')}</span>
            </div>
        </footer>
    )
}

export default Footer
