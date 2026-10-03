import { askKnowledgeBase, findSample } from './knowledgeBase'

const samples = [
    { q: '¿Qué experiencia tiene con AWS?', a: 'Respuesta AWS', src: ['cv.md'] },
    { q: '¿Qué sabe de RAG?', a: 'Respuesta RAG' },
]

test('findSample ignores accents, punctuation and case', () => {
    expect(findSample('que EXPERIENCIA tiene con aws', samples)).toBe(samples[0])
    expect(findSample('  ¿Qué sabe de RAG?? ', samples)).toBe(samples[1])
    expect(findSample('otra pregunta', samples)).toBeNull()
})

test('without a backend it answers samples and returns null for anything else', async () => {
    await expect(askKnowledgeBase('¿Qué experiencia tiene con AWS?', { samples }))
        .resolves.toEqual({ answer: 'Respuesta AWS', sources: ['cv.md'] })
    await expect(askKnowledgeBase('¿Qué sabe de RAG?', { samples }))
        .resolves.toEqual({ answer: 'Respuesta RAG', sources: [] })
    await expect(askKnowledgeBase('¿Dónde vive?', { samples })).resolves.toBeNull()
})
