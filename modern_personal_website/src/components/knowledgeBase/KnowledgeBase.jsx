import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './knowledgeBase.css'
import { useList } from '../../hooks/useList'
import { askKnowledgeBase, isLive } from '../../services/knowledgeBase'

const KnowledgeBase = () => {
    const { t, i18n } = useTranslation()
    const samples = useList('kb.questions')
    const [question, setQuestion] = useState('')
    const [result, setResult] = useState(null) // { answer, sources } | { message }
    const [loading, setLoading] = useState(false)

    // Start with the first sample answered, and re-sync when the language changes.
    useEffect(() => {
        if (samples.length === 0) return
        const first = samples[0]
        setQuestion(first.q)
        setResult({ answer: first.a, sources: first.src || [] })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language, samples.length])

    const ask = async (text) => {
        const trimmed = text.trim()
        if (!trimmed || loading) return
        setQuestion(trimmed)
        setLoading(true)
        try {
            const response = await askKnowledgeBase(trimmed, { samples, lang: i18n.language })
            setResult(response || { message: t('kb.offline') })
        } catch (error) {
            setResult({ message: t('kb.error') })
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        ask(question)
    }

    return (
        <aside className="kb" aria-labelledby="kb-title">
            <div className="kb__head">
                <h2 id="kb-title" className="kb__title mono">{t('kb.title')}</h2>
                <span className="kb__tag mono">{t('kb.tag')}</span>
            </div>

            <div className="kb__body">
                <p className="kb__intro">{t('kb.intro')}</p>

                <form className="kb__form" onSubmit={onSubmit}>
                    <label htmlFor="kb-question" className="visually-hidden">{t('kb.label')}</label>
                    <div className="kb__input-wrap">
                        <span className="kb__prompt mono" aria-hidden="true">›</span>
                        <input
                            id="kb-question"
                            className="kb__input mono"
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            autoComplete="off"
                            maxLength={300}
                        />
                    </div>
                    <button type="submit" className="kb__ask" disabled={loading}>
                        {loading ? t('kb.asking') : t('kb.ask')}
                    </button>
                </form>

                {result && (
                    <div className="kb__answer" aria-live="polite">
                        {result.message ? (
                            <p className="kb__message">{result.message}</p>
                        ) : (
                            <>
                                <p>{result.answer}</p>
                                {result.sources.length > 0 && (
                                    <div className="kb__sources mono">
                                        <span>{t('kb.sources')}</span>
                                        {result.sources.map((source) => (
                                            <span key={source} className="kb__source">{source}</span>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                <div className="kb__suggestions">
                    <span className="kb__try mono">{t('kb.tryWith')}</span>
                    {samples.map((sample) => {
                        const active = sample.q === question
                        return (
                            <button
                                key={sample.q}
                                type="button"
                                className={`kb__suggestion${active ? ' is-active' : ''}`}
                                onClick={() => ask(sample.q)}
                            >
                                <span aria-hidden="true">{active ? '›' : '·'}</span> {sample.q}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="kb__foot mono">
                <span>
                    <span className={isLive ? 'kb__state--live' : 'kb__state--building'}>●</span>{' '}
                    {isLive ? 'live' : t('kb.status')}
                </span>
                <span>{t('kb.arch')}</span>
            </div>
        </aside>
    )
}

export default KnowledgeBase
