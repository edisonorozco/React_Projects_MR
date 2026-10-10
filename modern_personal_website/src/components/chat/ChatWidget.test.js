import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n, { es } from '../../testUtils/i18nForTests'
import ChatWidget from './ChatWidget'
import { detectIntent, isValidEmail } from './intents'
import { profile } from '../../data/profile'

const openChat = async () => {
    render(<ChatWidget />)
    userEvent.click(screen.getByRole('button', { name: es.Chat.open }))
    expect(await screen.findByText(es.Chat.greeting)).toBeInTheDocument()
}

const send = (text) => {
    userEvent.type(screen.getByRole('textbox'), text)
    userEvent.click(screen.getByRole('button', { name: es.Chat.send }))
}

beforeEach(async () => {
    await act(() => i18n.changeLanguage('es'))
})

test('detects topics in Spanish and English free text', () => {
    expect(detectIntent('¿Cuánto cuesta una página web?')).toBe('quote')
    expect(detectIntent('Where has he worked before?')).toBe('experience')
    expect(detectIntent('¿Trabaja con React y AWS?')).toBe('experience')
    expect(detectIntent('Which technologies do you use?')).toBe('tech')
    expect(detectIntent('¿Eres una IA?')).toBe('ai')
    expect(detectIntent('hola')).toBeNull()
    expect(isValidEmail('ana@tienda.co')).toBe(true)
    expect(isValidEmail('ana@tienda')).toBe(false)
})

test('answers about experience with the real job list', async () => {
    await openChat()

    userEvent.click(screen.getByRole('button', { name: es.Chat.options.experience }))

    const [current] = es.Experience.jobsList
    expect(await screen.findByText(`${current.role} · ${current.company} (${current.period})`)).toBeInTheDocument()
})

test('quote flow collects the request and asks again for an invalid email', async () => {
    await openChat()

    userEvent.click(screen.getByRole('button', { name: es.Chat.options.quote }))
    userEvent.click(await screen.findByRole('button', { name: es.Chat.quote.types[0] }))
    userEvent.click(await screen.findByRole('button', { name: es.Chat.quote.timelines[1] }))
    await screen.findByText(es.Chat.quote.description)

    send('Una tienda para mi negocio')
    await screen.findByText(es.Chat.quote.name)
    send('Ana')
    await screen.findByText(es.Chat.quote.email)
    send('ana@tienda')
    expect(await screen.findByText(es.Chat.quote.invalidEmail)).toBeInTheDocument()
    send('ana@tienda.co')

    expect(await screen.findByText(es.Chat.quote.summary)).toBeInTheDocument()
    expect(screen.getByText(`${es.Chat.quote.labels.email}: ana@tienda.co`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: es.Chat.options.quoteSend })).toBeInTheDocument()
}, 20000) // seven bot replies, each with the typing delay

test('is honest when it does not understand a question', async () => {
    await openChat()

    send('¿Cuál es tu color favorito?')

    expect(await screen.findByText(es.Chat.answers.fallback)).toBeInTheDocument()
})

test('header menu restarts the conversation', async () => {
    await openChat()

    send('¿Cuál es tu color favorito?')
    await screen.findByText(es.Chat.answers.fallback)

    userEvent.click(screen.getByRole('button', { name: es.Chat.more }))
    userEvent.click(await screen.findByRole('menuitem', { name: es.Chat.restart }))

    await waitFor(() => expect(screen.queryByText('¿Cuál es tu color favorito?')).not.toBeInTheDocument())
    expect(await screen.findByText(es.Chat.greeting)).toBeInTheDocument()
})

test('floating shortcut opens email until a WhatsApp number is set', () => {
    const { unmount } = render(<ChatWidget />)
    expect(screen.getByRole('link', { name: es.Chat.emailMe })).toHaveAttribute('href', expect.stringMatching(/^mailto:/))
    unmount()

    profile.whatsapp = '+57 300 123 4567'
    try {
        render(<ChatWidget />)
        expect(screen.getByRole('link', { name: es.Chat.whatsapp }))
            .toHaveAttribute('href', expect.stringMatching(/^https:\/\/wa\.me\/573001234567\?text=/))
    } finally {
        profile.whatsapp = ''
    }
})
