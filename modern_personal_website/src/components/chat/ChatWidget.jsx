import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import { buildMailto } from '../contact/Contact';
import { profile, technologies } from '../../data/profile';
import { detectIntent, isValidEmail } from './intents';

const TYPING_DELAY = 550;
const TEASER_DELAY = 8000;
const TEASER_KEY = 'chatTeaserSeen';
const OPEN_EVENT = 'chat:open';

export const openChat = () => window.dispatchEvent(new Event(OPEN_EVENT));

const MAIN_MENU = ['quote', 'experience', 'services', 'projects', 'tech', 'contact', 'ai'].map((action) => ({ action }));
const BACK = [{ action: 'menu' }];

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
    const timers = useRef([]);
    const bodyRef = useRef(null);
    const inputRef = useRef(null);

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
        inputRef.current?.focus();
        const onKey = (event) => event.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
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
            setMessages((current) => [...current, ...botMessages.map((message) => ({ from: 'bot', ...message }))]);
            setOptions(nextOptions);
        }, TYPING_DELAY));
    };

    const say = (text) => setMessages((current) => [...current, { from: 'user', text }]);

    const toggle = () => {
        hideTeaser();
        if (!open && messages.length === 0) reply([{ text: t('Chat.greeting') }], MAIN_MENU);
        setOpen(!open);
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
        <div className="chat-widget">
            {open && (
                <section className="chat" role="dialog" aria-label={t('Chat.title')}>
                    <header className="chat__header">
                        <span className="chat__avatar" aria-hidden="true">EO</span>
                        <div className="chat__heading">
                            <h2>{t('Chat.title')}</h2>
                            <span className="chat__status">{t('Chat.status')}</span>
                        </div>
                        <button className="chat__close" onClick={() => setOpen(false)} aria-label={t('Chat.close')}>
                            <Icon name="close" size={18} />
                        </button>
                    </header>

                    <div className="chat__body" ref={bodyRef} aria-live="polite">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat__msg chat__msg--${message.from}`}>
                                {message.text && <p>{message.text}</p>}
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
                            </div>
                        ))}

                        {typing && (
                            <div className="chat__msg chat__msg--bot chat__typing" aria-label={t('Chat.typing')}>
                                <span></span><span></span><span></span>
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
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={placeholder}
                            aria-label={placeholder}
                            inputMode={quote?.step === 'email' ? 'email' : 'text'}
                            maxLength={500}
                        />
                        <button type="submit" aria-label={t('Chat.send')} disabled={!input.trim()}>
                            <Icon name="send" size={16} />
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
