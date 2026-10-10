import React, { useId } from 'react'

/* The assistant's mascot: a friendly bot wearing Edison's cap, with </> on the front.
   Self-contained colors so it reads the same on light and dark backgrounds. */
const BotAvatar = ({ size = 40, className = '' }) => {
    const gradient = `bot-bg-${useId().replace(/:/g, '')}`;
    return (
        <svg
            className={`bot-avatar ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#34d399" />
                    <stop offset="1" stopColor="#0f766e" />
                </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="32" fill={`url(#${gradient})`} />

            {/* Ears and head */}
            <rect x="9.5" y="33" width="6" height="11" rx="3" fill="#cbd5e1" />
            <rect x="48.5" y="33" width="6" height="11" rx="3" fill="#cbd5e1" />
            <rect x="13" y="22" width="38" height="32" rx="13" fill="#f8fafc" />

            {/* Visor with blinking eyes, and a smile */}
            <rect x="18.5" y="30" width="27" height="15" rx="7.5" fill="#0f172a" />
            <g className="bot-avatar__eyes" fill="#34d399">
                <rect x="24" y="34" width="4.5" height="7" rx="2.25" />
                <rect x="35.5" y="34" width="4.5" height="7" rx="2.25" />
            </g>
            <path d="M28.5 48.5q3.5 2.6 7 0" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

            {/* Cap: crown, brim and </> */}
            <path d="M14 27.5C14 16 22 10.5 32 10.5S50 16 50 27.5Z" fill="#1e293b" />
            <rect x="11" y="25.5" width="42" height="5" rx="2.5" fill="#0f172a" />
            <circle cx="32" cy="11" r="1.8" fill="#0f172a" />
            <g fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M27.5 17.5 25 20l2.5 2.5" />
                <path d="M36.5 17.5 39 20l-2.5 2.5" />
                <path d="M33 16.5 31 23.5" />
            </g>
        </svg>
    );
};

export default BotAvatar
