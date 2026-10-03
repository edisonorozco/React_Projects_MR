import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './contact.css'
import { profile } from '../../data/profile'
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from '../ui/Icons'

const REASONS = ['biz', 'job']

// Builds a mailto: link so the form works on a static site without a backend.
export const buildMailto = ({ to, subject, name, email, message }) => {
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const Contact = () => {
    const { t } = useTranslation()
    const [reason, setReason] = useState('biz')
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [sent, setSent] = useState(false)

    const onChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

    const onSubmit = (event) => {
        event.preventDefault()
        window.location.href = buildMailto({
            to: profile.email,
            subject: `${t(`contact.reasons.${reason}.subject`)} — ${form.name}`,
            ...form,
        })
        setSent(true)
    }

    return (
        <section id="contact" className="section" aria-labelledby="contact-title">
            <div className="container contact">
                <div className="contact__intro reveal">
                    <span className="section__label">{t('contact.label')}</span>
                    <h2 id="contact-title" className="contact__title">{t('contact.title')}</h2>
                    <p className="contact__subtitle">{t('contact.subtitle')}</p>
                    <a href={`mailto:${profile.email}`} className="btn btn--dark contact__email">
                        <MailIcon /> {profile.email}
                    </a>
                    <div className="contact__links">
                        <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn--outline">
                            <GithubIcon size={16} /> GitHub
                        </a>
                        {profile.linkedin && (
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn--outline">
                                <LinkedinIcon size={16} /> LinkedIn
                            </a>
                        )}
                        {profile.cv && (
                            <a href={profile.cv} download className="btn btn--outline">
                                <DownloadIcon size={16} /> CV
                            </a>
                        )}
                    </div>
                </div>

                <form className="contact__form reveal" onSubmit={onSubmit}>
                    <fieldset className="contact__reasons">
                        <legend className="visually-hidden">{t('contact.reasonLegend')}</legend>
                        {REASONS.map((id) => (
                            <button
                                key={id}
                                type="button"
                                className={`contact__reason${reason === id ? ' is-active' : ''}`}
                                aria-pressed={reason === id}
                                onClick={() => setReason(id)}
                            >
                                {t(`contact.reasons.${id}.label`)}
                            </button>
                        ))}
                    </fieldset>

                    <div className="contact__row">
                        <label className="visually-hidden" htmlFor="contact-name">{t('contact.name')}</label>
                        <input id="contact-name" name="name" type="text" required autoComplete="name"
                            placeholder={t('contact.name')} value={form.name} onChange={onChange} className="contact__input" />
                        <label className="visually-hidden" htmlFor="contact-email">{t('contact.email')}</label>
                        <input id="contact-email" name="email" type="email" required autoComplete="email"
                            placeholder={t('contact.email')} value={form.email} onChange={onChange} className="contact__input" />
                    </div>

                    <label className="visually-hidden" htmlFor="contact-message">{t('contact.message')}</label>
                    <textarea id="contact-message" name="message" rows="4" required
                        placeholder={t(`contact.reasons.${reason}.placeholder`)} value={form.message} onChange={onChange}
                        className="contact__input contact__textarea" />

                    <button type="submit" className="btn btn--dark">{t('contact.send')}</button>

                    {sent && (
                        <p className="contact__sent" role="status">
                            {t('contact.sent')} <a href={`mailto:${profile.email}`}>{profile.email}</a>
                        </p>
                    )}
                </form>
            </div>
        </section>
    )
}

export default Contact
