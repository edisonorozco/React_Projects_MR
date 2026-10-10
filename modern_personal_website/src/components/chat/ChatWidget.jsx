import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import { buildMailto } from '../contact/Contact';
import { profile, technologies } from '../../data/profile';
import { detectIntent, isValidEmail } from './intents';
import avatar from '../../assets/avatar.jpg';

const TYPING_DELAY = 550;
const TEASER_DELAY = 8000;
const TEASER_KEY = 'chatTeaserSeen';
const OPEN_EVENT = 'chat:open';

export const openChat = () => window.dispatchEvent(new Event(OPEN_EVENT));

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const MAIN_MENU = ['quote', 'experience', 'services', 'projects', 'tech', 'contact', 'ai'].map((action) => ({ action }));
const BACK = [{ action: 'menu' }];

const BotAvatar = ({ show }) => (show
    ? <img className="chat__msg-avatar" src={avatar} alt="" />
    : <span className="chat__msg-avatar" aria-hidden="true" />);

/* Guided assistant: answers come from the same translation data as the page.
   Free text is matched by keywords for now; later it will go to the RAG backend. */
const ChatWidget = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [options, setOptions] = useState([]);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState('');
    const [quote, setQuote] = useState(null);
    const [teaser, setTeaser] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const timers = useRef([]);
    const bodyRef = useRef(null);
    const inputRef = useRef(null);
    const panelRef = useRef(null);

    const list = (key) => {
        const value = t(key, { returnObjects: true });
        return Array.isArray(value) ? value : [];
    };

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    /* Invite the visitor once per session */
    useEffect(() => {
        let seen = false;
        try { seen = sessionStorage.getItem(TEASER_KEY) === '1'; } catch (e) { /* storage blocked */ }
        if (seen) return undefined;
        const id = setTimeout(() => setTeaser(true), TEASER_DELAY);
        return () => clearTimeout(id);
    }, []);

    const hideTeaser = () => {
        setTeaser(false);
        try { sessionStorage.setItem(TEASER_KEY, '1'); } catch (e) { /* storage blocked */ }
    };

    useEffect(() => {
        if (!open) return undefined;
        /* Only autofocus with a mouse: on touch screens it would pop the keyboard up right away */
        if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) inputRef.current?.focus();
        const onKey = (event) => event.key === 'Escape' && close();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    /* iOS keeps fixed elements on the layout viewport, so the keyboard covers them.
       The panel is placed from the visible area instead (visualViewport), which already
       excludes the keyboard in Safari and in in-app browsers like Instagram. */
    useEffect(() => {
        if (!open) return undefined;
        document.documentElement.classList.add('chat-open');
        const viewport = window.visualViewport;
        const panel = panelRef.current;
        if (!viewport || !panel) return () => document.documentElement.classList.remove('chat-open');

        let lastHeight = 0;
        const update = () => {
            panel.style.setProperty('--vv-top', `${Math.round(viewport.offsetTop)}px`);
            panel.style.setProperty('--vv-height', `${Math.round(viewport.height)}px`);
            /* Keyboard opened or closed: keep the latest message in sight */
            if (viewport.height !== lastHeight && bodyRef.current) {
                bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
            }
            lastHeight = viewport.height;
        };
        update();
        viewport.addEventListener('resize', update);
        viewport.addEventListener('scroll', update);
        return () => {
            viewport.removeEventListener('resize', update);
            viewport.removeEventListener('scroll', update);
            document.documentElement.classList.remove('chat-open');
        };
    }, [open]);

    useEffect(() => {
        const body = bodyRef.current;
        if (body) body.scrollTop = body.scrollHeight;
    }, [messages, typing, options, open]);

    const reply = (botMessages, nextOptions) => {
        setOptions([]);
        setTyping(true);
        timers.current.push(setTimeout(() => {
            setTyping(false);
            setMessages((current) => [...current, ...botMessages.map((message) => ({ from: 'bot', time: now(), ...message }))]);
            setOptions(nextOptions);
        }, TYPING_DELAY));
    };

    const say = (text) => setMessages((current) => [...current, { from: 'user', text, time: now() }]);

    const toggle = () => {
        hideTeaser();
        if (!open && messages.length === 0) reply([{ text: t('Chat.greeting') }], MAIN_MENU);
        setOpen(!open);
        setMenuOpen(false);
    };

    function close() {
        setOpen(false);
        setMenuOpen(false);
    }

    const restart = () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        setMenuOpen(false);
        setMessages([]);
        setQuote(null);
        setInput('');
        reply([{ text: t('Chat.greeting') }], MAIN_MENU);
    };

    const showMenu = () => {
        setMenuOpen(false);
        if (!typing) run('menu');
    };

    /* Other parts of the page (e.g. the hero button) open the chat through openChat() */
    const openRef = useRef();
    openRef.current = () => !open && toggle();
    useEffect(() => {
        const onOpen = () => openRef.current();
        window.addEventListener(OPEN_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_EVENT, onOpen);
    }, []);

    const sectionLink = (id) => [{ label: t('Chat.links.section'), href: `#${id}` }];

    const answers = {
        experience: () => ({
            text: t('Chat.answers.experience'),
            list: list('Experience.jobsList').map((job) => `${job.role} · ${job.company} (${job.period})`),
            links: sectionLink('experience'),
        }),
        services: () => ({
            text: t('Chat.answers.services'),
            list: list('Services.items').map((service) => service.title),
            links: sectionLink('services'),
        }),
        projects: () => ({
            text: t('Chat.answers.projects'),
            list: list('Projects.items').map((project) => `${project.title} · ${t(`Projects.status.${project.status}`)}`),
            links: sectionLink('projects'),
        }),
        tech: () => ({ text: t('Chat.answers.tech'), list: [technologies.join(', ')] }),
        contact: () => ({
            text: t('Chat.answers.contact'),
            links: [
                { label: `${t('Chat.links.email')} · ${profile.email}`, href: `mailto:${profile.email}` },
                { label: t('Chat.links.github'), href: profile.github, external: true },
                profile.linkedin && { label: t('Chat.links.linkedin'), href: profile.linkedin, external: true },
            ].filter(Boolean),
        }),
        ai: () => ({ text: t('Chat.answers.ai') }),
    };

    const followUps = {
        experience: [{ action: 'projects' }, { action: 'tech' }, { action: 'quote' }, ...BACK],
        services: [{ action: 'quote' }, ...BACK],
        projects: [{ action: 'experience' }, { action: 'quote' }, ...BACK],
        tech: [{ action: 'projects' }, { action: 'quote' }, ...BACK],
        contact: [{ action: 'quote' }, ...BACK],
        ai: [{ action: 'experience' }, { action: 'projects' }, ...BACK],
    };

    const quoteSummary = (data) => {
        const labels = t('Chat.quote.labels', { returnObjects: true });
        return ['type', 'timeline', 'description', 'name', 'email'].map((field) => `${labels[field]}: ${data[field]}`);
    };

    const run = (action, value) => {
        switch (action) {
            case 'menu':
            case 'cancel':
                setQuote(null);
                reply([{ text: t('Chat.menuPrompt') }], MAIN_MENU);
                break;
            case 'quote':
                setQuote({ step: 'type' });
                reply([{ text: t('Chat.quote.start') }], [
                    ...list('Chat.quote.types').map((type) => ({ action: 'quoteType', label: type, value: type })),
                    { action: 'cancel' },
                ]);
                break;
            case 'quoteType':
                setQuote({ step: 'timeline', type: value });
                reply([{ text: t('Chat.quote.timeline') }], [
                    ...list('Chat.quote.timelines').map((timeline) => ({ action: 'quoteTimeline', label: timeline, value: timeline })),
                    { action: 'cancel' },
                ]);
                break;
            case 'quoteTimeline':
                setQuote((current) => ({ ...current, step: 'description', timeline: value }));
                reply([{ text: t('Chat.quote.description') }], [{ action: 'cancel' }]);
                break;
            case 'quoteSend':
                window.location.href = buildMailto({
                    to: profile.email,
                    subject: `${t('Chat.quote.subject')}: ${quote.type} — ${quote.name}`,
                    name: quote.name,
                    email: quote.email,
                    message: quoteSummary(quote).join('\n'),
                });
                setQuote(null);
                reply([{ text: t('Chat.quote.sent') }], BACK);
                break;
            default:
                if (answers[action]) reply([answers[action]()], followUps[action]);
        }
    };

    const choose = (option) => {
        say(optionLabel(option));
        run(option.action, option.value);
    };

    /* Free text: feeds the quote form while it is open, otherwise it is matched to a topic */
    const answerQuoteStep = (text) => {
        if (quote.step === 'description') {
            setQuote({ ...quote, step: 'name', description: text });
            reply([{ text: t('Chat.quote.name') }], [{ action: 'cancel' }]);
        } else if (quote.step === 'name') {
            setQuote({ ...quote, step: 'email', name: text });
            reply([{ text: t('Chat.quote.email') }], [{ action: 'cancel' }]);
        } else if (quote.step === 'email' && !isValidEmail(text)) {
            reply([{ text: t('Chat.quote.invalidEmail') }], [{ action: 'cancel' }]);
        } else if (quote.step === 'email') {
            const data = { ...quote, step: 'review', email: text.trim() };
            setQuote(data);
            reply([{ text: t('Chat.quote.summary'), list: quoteSummary(data) }], [
                { action: 'quoteSend' },
                { action: 'quote', label: t('Chat.quote.restart') },
                ...BACK,
            ]);
        } else {
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const text = input.trim();
        if (!text || typing) return;
        setInput('');
        say(text);
        if (quote && answerQuoteStep(text)) return;

        const intent = detectIntent(text);
        if (intent) run(intent);
        else reply([{ text: t('Chat.answers.fallback') }], MAIN_MENU);
    };

    const optionLabel = (option) => option.label || t(`Chat.options.${option.action}`);

    const placeholders = { description: 'descriptionPlh', name: 'namePlh', email: 'emailPlh' };
    const placeholder = quote && placeholders[quote.step]
        ? t(`Chat.quote.${placeholders[quote.step]}`)
        : t('Chat.placeholder');

    return (
        <div className={open ? 'chat-widget chat-widget--open' : 'chat-widget'}>
            {open && (
                <section className="chat" ref={panelRef} role="dialog" aria-label={t('Chat.title')}>
                    <header className="chat__header">
                        {/* Back arrow on phones (app style), X on larger screens */}
                        <button className="chat__icon-btn chat__close" onClick={close} aria-label={t('Chat.close')}>
                            <Icon name="arrowLeft" size={22} className="chat__close-back" />
                            <Icon name="close" size={18} className="chat__close-x" />
                        </button>
                        <img className="chat__avatar" src={avatar} alt="" />
                        <div className="chat__heading">
                            <h2>{t('Chat.title')}</h2>
                            <span className="chat__status">{t('Chat.status')}</span>
                        </div>
                        <div className="chat__menu">
                            <button
                                className="chat__icon-btn"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label={t('Chat.more')}
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                            >
                                <Icon name="moreVertical" size={20} />
                            </button>
                            {menuOpen && <div className="chat__menu-backdrop" onClick={() => setMenuOpen(false)} />}
                            {menuOpen && (
                                <div className="chat__menu-list" role="menu">
                                    <button role="menuitem" onClick={showMenu}>{t('Chat.showOptions')}</button>
                                    <button role="menuitem" onClick={restart}>{t('Chat.restart')}</button>
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="chat__body" ref={bodyRef} aria-live="polite">
                        <span className="chat__day">{t('Chat.today')}</span>

                        {messages.map((message, index) => {
                            const first = index === 0 || messages[index - 1].from !== message.from;
                            const rich = message.list || message.links;
                            const meta = (
                                <span className="chat__meta">
                                    {message.time}
                                    {message.from === 'user' && <Icon name="checks" size={15} className="chat__read" />}
                                </span>
                            );
                            return (
                                <div key={index} className={`chat__row chat__row--${message.from}${first ? ' chat__row--first' : ''}`}>
                                    {message.from === 'bot' && <BotAvatar show={first} />}
                                    <div className={`chat__msg chat__msg--${message.from}`}>
                                        {message.text && <p>{message.text}{!rich && meta}</p>}
                                        {message.list && (
                                            <ul className="chat__list">
                                                {message.list.map((item) => <li key={item}>{item}</li>)}
                                            </ul>
                                        )}
                                        {message.links && (
                                            <div className="chat__links">
                                                {message.links.map((link) => (
                                                    <a
                                                        key={link.href}
                                                        href={link.href}
                                                        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                                                    >
                                                        {link.label} <Icon name={link.external ? 'external' : 'arrowRight'} size={13} />
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                        {rich && <div className="chat__meta-row">{meta}</div>}
                                    </div>
                                </div>
                            );
                        })}

                        {typing && (
                            <div className="chat__row chat__row--bot">
                                <BotAvatar show={messages[messages.length - 1]?.from !== 'bot'} />
                                <div className="chat__msg chat__msg--bot chat__typing" aria-label={t('Chat.typing')}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}

                        {options.length > 0 && (
                            <div className="chat__options">
                                {options.map((option) => (
                                    <button
                                        key={option.action + (option.value || option.label || '')}
                                        className={option.action === 'quoteSend' ? 'chat__option chat__option--primary' : 'chat__option'}
                                        onClick={() => choose(option)}
                                    >
                                        {optionLabel(option)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <form className="chat__form" onSubmit={handleSubmit}>
                        <button
                            type="button"
                            className="chat__plus"
                            onClick={showMenu}
                            aria-label={t('Chat.showOptions')}
                            disabled={typing}
                        >
                            <Icon name="plus" size={22} />
                        </button>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={placeholder}
                            aria-label={placeholder}
                            inputMode={quote?.step === 'email' ? 'email' : 'text'}
                            enterKeyHint="send"
                            maxLength={500}
                        />
                        <button type="submit" className="chat__send" aria-label={t('Chat.send')} disabled={!input.trim()}>
                            <Icon name="send" size={18} />
                        </button>
                    </form>
                </section>
            )}

            {teaser && !open && (
                <div className="chat-teaser card">
                    <button className="chat-teaser__text" onClick={toggle}>{t('Chat.teaser')}</button>
                    <button className="chat-teaser__close" onClick={hideTeaser} aria-label={t('Chat.dismiss')}>
                        <Icon name="close" size={14} />
                    </button>
                </div>
            )}

            <button
                className="chat-fab"
                onClick={toggle}
                aria-label={open ? t('Chat.close') : t('Chat.open')}
                aria-expanded={open}
            >
                <Icon name={open ? 'close' : 'message'} size={24} />
            </button>
        </div>
    )
}

export default ChatWidget
