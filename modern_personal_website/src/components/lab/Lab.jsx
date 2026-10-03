import React from 'react'
import { useTranslation } from 'react-i18next'
import './lab.css'
import { useList } from '../../hooks/useList'

const Lab = () => {
    const { t } = useTranslation()
    const items = useList('lab.items')
    const now = useList('lab.now')

    return (
        <section id="lab" className="section lab" aria-labelledby="lab-title">
            <div className="container">
                <div className="section__head">
                    <div className="section__head-main">
                        <span className="section__label">{t('lab.label')}</span>
                        <h2 id="lab-title" className="section__title">{t('lab.title')}</h2>
                    </div>
                </div>

                <ul className="lab__grid">
                    {items.map((item) => (
                        <li key={item.name} className="experiment reveal">
                            <span className={`status status--${item.status.toLowerCase()}`}>{item.status}</span>
                            <div className="experiment__text">
                                <h3 className="experiment__name">{item.name}</h3>
                                <span className="experiment__stack mono">{item.stack}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <p className="now reveal">
                    <span className="now__path mono">/now</span>
                    <span className="now__label">{t('lab.nowLabel')}</span>
                    {now.map((topic, index) => (
                        <React.Fragment key={topic}>
                            {index > 0 && <span className="now__sep" aria-hidden="true">·</span>}
                            <span>{topic}</span>
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </section>
    )
}

export default Lab
