import { buildMailto } from './Contact'

test('buildMailto encodes subject and body for the mail client', () => {
    const url = buildMailto({
        to: 'edison.orozco@outlook.com',
        subject: 'Proyecto para mi negocio — Ana',
        name: 'Ana',
        email: 'ana@tienda.co',
        message: 'Necesito una página & un catálogo',
    })

    expect(url.startsWith('mailto:edison.orozco@outlook.com?subject=')).toBe(true)
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('subject')).toBe('Proyecto para mi negocio — Ana')
    expect(params.get('body')).toBe('Necesito una página & un catálogo\n\n— Ana (ana@tienda.co)')
})
