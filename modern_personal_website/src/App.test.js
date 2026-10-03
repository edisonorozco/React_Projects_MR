import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n, { es, en } from './testUtils/i18nForTests'
import App from './App'

beforeEach(async () => {
    document.documentElement.dataset.theme = 'light'
    await act(() => i18n.changeLanguage('es'))
})

test('shows who Edison is and every section of the page', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(es.hero.titleA)
    expect(screen.getByText(es.hero.role)).toBeInTheDocument()
    for (const id of ['about', 'experience', 'projects', 'lab', 'services', 'contact']) {
        expect(document.getElementById(id)).toBeInTheDocument()
    }
})

test('knowledge base answers the sample questions with their sources', async () => {
    render(<App />)
    const [, second] = es.kb.questions

    // The first sample is answered on load.
    expect(screen.getByText(es.kb.questions[0].a)).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: new RegExp(second.q.replace(/[?¿]/g, '.')) }))

    expect(await screen.findByText(second.a)).toBeInTheDocument()
    expect(screen.getByText(second.src[0])).toBeInTheDocument()
})

test('knowledge base is honest about questions it cannot answer yet', async () => {
    render(<App />)
    const input = screen.getByLabelText(es.kb.label)

    userEvent.clear(input)
    userEvent.type(input, '¿Cuál es su color favorito?')
    userEvent.click(screen.getByRole('button', { name: es.kb.ask }))

    expect(await screen.findByText(es.kb.offline)).toBeInTheDocument()
})

test('theme toggle switches and remembers dark mode', async () => {
    render(<App />)

    userEvent.click(screen.getByRole('button', { name: es.nav.toDark }))

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    // user-event v13 doesn't wrap clicks in act(), so the re-render lands a tick later.
    expect(await screen.findByRole('button', { name: es.nav.toLight })).toBeInTheDocument()
})

test('language toggle switches the page to English', async () => {
    render(<App />)

    userEvent.click(screen.getByRole('button', { name: es.nav.switchLang }))

    await waitFor(() =>
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en.hero.titleA)
    )
})
