import { useCallback, useState } from 'react';

const readTheme = () =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

// The initial theme is applied by the inline script in public/index.html.
export const useTheme = () => {
    const [theme, setTheme] = useState(readTheme);

    const toggleTheme = useCallback(() => {
        const next = readTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Storage blocked (private mode): the choice just won't persist.
        }
        setTheme(next);
    }, []);

    return { theme, isDark: theme === 'dark', toggleTheme };
};
