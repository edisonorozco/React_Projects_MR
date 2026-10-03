import { useEffect, useState } from 'react';

const THEME_COLORS = { light: '#ffffff', dark: '#0f172a' };

const readSaved = () => {
    try {
        return localStorage.getItem('theme');
    } catch (e) {
        return null;
    }
};

/* Light/dark theme stored on <html data-theme>; public/index.html sets it before the first paint */
const useTheme = () => {
    const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
    }, [theme]);

    /* Follow the OS setting until the visitor picks a theme themselves */
    useEffect(() => {
        const media = window.matchMedia?.('(prefers-color-scheme: dark)');
        if (!media) return undefined;
        const onChange = (event) => !readSaved() && setTheme(event.matches ? 'dark' : 'light');
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem('theme', next);
        } catch (e) { /* private mode: the choice just won't persist */ }
        document.documentElement.dataset.theme = next;
        setTheme(next);
    };

    return { isDark: theme === 'dark', toggleTheme };
};

export default useTheme;
