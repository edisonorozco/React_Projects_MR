import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Header from './Header'

test('renderes content', () => {
    const header = {
        content: 'Edison Orozco',
        important: true
    }

    const component = render(<Header header />)

})