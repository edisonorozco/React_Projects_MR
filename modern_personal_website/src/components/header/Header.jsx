import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './header.css'
import { useTheme } from '../../hooks/useTheme'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from '../ui/Icons'

const LINKS = ['about', 'experience', 'projects', 'lab', 'services', 'contact']

const Header = () => {
    const { t, i18n } = useTranslation()
    const { isDark, toggleTheme } = useTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const isEnglish = i18n.language?.startsWith('en')

    useEffect(() => {
        if (!menuOpen) return undefined
        const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [menuOpen])

    const closeMenu = () => setMenuOpen(false)

    return (
        <header className="header">
            <nav className="header__nav container" aria-label="Principal">
                <a href="#top" className="header__logo" onClick={closeMenu}>
                    <span className="header__logo-mark">EO</span>
                    <span className="header__logo-slash">/</span>
                    <span className="header__logo-name">Edison Orozco</span>
                </a>

                <ul className="header__links">
                    {LINKS.map((id) => (
                        <li key={id}>
                            <a href={`#${id}`}>{t(`nav.${id}`)}</a>
                        </li>
                    ))}
                </ul>

                <div className="header__actions">
                    <button
                        type="button"
                        className="header__lang"
                        onClick={() => i18n.changeLanguage(isEnglish ? 'es' : 'en')}
                        aria-label={t('nav.switchLang')}
                    >
                        <span className={!isEnglish ? 'is-active' : ''}>ES</span> / <span className={isEnglish ? 'is-active' : ''}>EN</span>
                    </button>
                    <button
                        type="button"
                        className="header__icon-btn"
                        onClick={toggleTheme}
                        aria-label={isDark ? t('nav.toLight') : t('nav.toDark')}
                    >
                        {isDark ? <SunIcon size={17} /> : <MoonIcon size={17} />}
                    </button>
                    <a href="#contact" className="header__cta" onClick={closeMenu}>{t('nav.talk')}</a>
                    <button
                        type="button"
                        className="header__icon-btn header__menu-btn"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                    >
                        {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <ul id="mobile-menu" className="header__mobile container">
                    {LINKS.map((id, index) => (
                        <li key={id}>
                            <a href={`#${id}`} onClick={closeMenu}>
                                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                                {t(`nav.${id}`)}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    )
}

export default Header
