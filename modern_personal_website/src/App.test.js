import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n, { es, en } from './testUtils/i18nForTests'
import App from './App'

beforeEach(async () => {
    await act(() => i18n.changeLanguage('es'))
})

test('shows who Edison is and every section of the page', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(`${es.Home.titleA} ${es.Home.titleB}`)
    for (const id of ['home', 'about', 'services', 'projects', 'experience', 'contact']) {
        expect(document.getElementById(id)).toBeInTheDocument()
    }
    expect(screen.getAllByRole('heading', { level: 3, name: es.Services.items[0].title })).not.toHaveLength(0)
})

test('lists the real experience, starting with the current job', () => {
    render(<App />)

    const [current] = es.Experience.jobsList
    const firstJob = document.querySelector('#experience .experience__item')
    expect(firstJob).toHaveTextContent(current.role)
    expect(firstJob).toHaveTextContent(current.company)
    expect(firstJob).toHaveTextContent(current.period)
})

test('language toggle switches the page to English', async () => {
    render(<App />)

    userEvent.click(screen.getByRole('button', { name: 'EN' }))

    await waitFor(() =>
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(`${en.Home.titleA} ${en.Home.titleB}`)
    )
})
