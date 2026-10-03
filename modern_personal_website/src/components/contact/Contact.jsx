import React from 'react'
import { useTranslation } from 'react-i18next';
import './contact.css'
import Icon from '../Icon';
import { profile } from '../../data/profile';

/* No backend yet: the form opens the visitor's mail app with the message pre-filled */
export const buildMailto = ({ to, subject, name, email, message }) => {
    const body = `${message}\n\n— ${name} (${email})`;
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const channels = [
    { icon: 'mail', title: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'linkedin', title: 'LinkedIn', value: 'Edison Orozco', href: profile.linkedin },
    { icon: 'github', title: 'GitHub', value: 'edisonorozco', href: profile.github }
].filter((channel) => channel.href);

const Contact = () => {
    const { t } = useTranslation();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const name = form.get('name');
        window.location.href = buildMailto({
            to: profile.email,
            subject: `${t('Contact.subject')} ${name}`,
            name,
            email: form.get('email'),
            message: form.get('message'),
        });
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <div className="section__head">
                    <span className="eyebrow">{t('Contact.eyebrow')}</span>
                    <h2 className="section__title">
                        {t('Contact.titleA')} <span>{t('Contact.titleB')}</span>
                    </h2>
                    <p className="section__desc">{t('Contact.desc')}</p>
                </div>

                <div className="contact__container">
                    <ul className="contact__channels">
                        {channels.map((channel) => (
                            <li key={channel.title}>
                                <a
                                    href={channel.href}
                                    className="contact__channel card"
                                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noreferrer"
                                >
                                    <span className="icon-tile"><Icon name={channel.icon} /></span>
                                    <div>
                                        <h3>{channel.title}</h3>
                                        <span>{channel.value}</span>
                                    </div>
                                    <Icon name="arrowRight" size={16} className="contact__arrow" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <form className="contact__form card" onSubmit={handleSubmit}>
                        <div className="contact__row">
                            <label className="contact__field">
                                <span>{t('Contact.name')}</span>
                                <input type="text" name="name" required placeholder={t('Contact.plhName')} />
                            </label>
                            <label className="contact__field">
                                <span>{t('Contact.email')}</span>
                                <input type="email" name="email" required placeholder={t('Contact.plhEmail')} />
                            </label>
                        </div>
                        <label className="contact__field">
                            <span>{t('Contact.message')}</span>
                            <textarea name="message" rows="6" required placeholder={t('Contact.plhMessage')}></textarea>
                        </label>
                        <div className="contact__footer">
                            <p>{t('Contact.note')}</p>
                            <button type="submit" className="button">
                                {t('Contact.send')} <Icon name="send" size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
