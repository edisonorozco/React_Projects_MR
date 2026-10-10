import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const THEME_COLORS = { light: '#ffffff', dark: '#0f172a' };

const REVEAL_MS = 700;
const FADE_MS = 450;

const readSaved = () => {
    try {
        return localStorage.getItem('theme');
    } catch (e) {
        return null;
    }
};

const revealFrom = (origin, update) => {
    const rect = origin?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    /* Distance to the farthest corner; the mask is solid up to 70% of its radius, then fades out */
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const size = (radius / 0.7) * 2;

    const transition = document.startViewTransition(update);
    transition.ready.then(() => {
        document.documentElement.animate(
            {
                maskSize: ['0px 0px', `${size}px ${size}px`],
                maskPosition: [`${x}px ${y}px`, `${x - size / 2}px ${y - size / 2}px`],
            },
            { duration: REVEAL_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both', pseudoElement: '::view-transition-new(root)' },
        );
    }).catch(() => { /* transition skipped: the theme is already applied */ });
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

    /* The new theme spreads from the toggle in a circle with a soft gradient edge (View Transitions).
       Browsers without them fade the colors instead; reduced motion switches instantly. */
    const toggleTheme = (event) => {
        const next = theme === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem('theme', next);
        } catch (e) { /* private mode: the choice just won't persist */ }

        const root = document.documentElement;
        const apply = () => {
            root.dataset.theme = next;
            setTheme(next);
        };

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            apply();
        } else if (document.startViewTransition) {
            revealFrom(event?.currentTarget, () => flushSync(apply));
        } else {
            root.classList.add('theme-fade');
            apply();
            setTimeout(() => root.classList.remove('theme-fade'), FADE_MS);
        }
    };

    return { isDark: theme === 'dark', toggleTheme };
};

export default useTheme;
