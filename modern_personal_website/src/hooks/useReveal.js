import { useEffect } from 'react';

// Fades in every `.reveal` element the first time it enters the viewport.
// `key` re-runs the scan when content is re-rendered with new elements (e.g. a language change).
export const useReveal = (key) => {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal:not(.is-visible)');
        if (!('IntersectionObserver' in window)) {
            elements.forEach((el) => el.classList.add('is-visible'));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -10% 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [key]);
};
