import React, { useEffect, useState } from 'react'
import './header.css'
import { useTranslation } from 'react-i18next';
import Languaje from '../Languaje/Languaje';
import Icon from '../Icon';
import useTheme from '../../hooks/useTheme';

const links = ['home', 'about', 'services', 'projects', 'experience', 'contact'];

const Header = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    /* Highlight the link of the section currently in view */
    useEffect(() => {
        const sections = links.map((id) => document.getElementById(id)).filter(Boolean);
        if (!sections.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={scrolled ? 'header header--scrolled' : 'header'}>
            <nav className="nav container">
                <a href="#home" className="nav__logo" onClick={() => setOpen(false)}>
                    <span className="nav__logo-mark">EO</span>
                    Edison Orozco
                </a>

                <ul className={open ? 'nav__list nav__list--open' : 'nav__list'}>
                    {links.map((id) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={active === id ? 'nav__link nav__link--active' : 'nav__link'}
                                onClick={() => setOpen(false)}
                            >
                                {t(`Header.${id}`)}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="nav__actions">
                    <Languaje />
                    <button
                        className="nav__theme"
                        onClick={toggleTheme}
                        aria-label={isDark ? t('Header.toLight') : t('Header.toDark')}
                        title={isDark ? t('Header.toLight') : t('Header.toDark')}
                    >
                        <Icon name={isDark ? 'sun' : 'moon'} size={17} />
                    </button>
                    <a href="#contact" className="button button--small nav__hire">{t('Header.hire')}</a>
                    <button
                        className="nav__toggle"
                        onClick={() => setOpen(!open)}
                        aria-label={open ? t('Header.close') : t('Header.menu')}
                        aria-expanded={open}
                    >
                        <Icon name={open ? 'close' : 'menu'} size={22} />
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header
