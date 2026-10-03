// Client for the "personal knowledge base" (RAG over the CV and project docs).
//
// The browser never talks to the LLM or to Supabase directly and never holds an API key:
//   React -> CloudFront -> API Gateway -> Lambda (LangChain/LangGraph) -> Supabase pgvector -> LLM
// Until REACT_APP_KB_API_URL is set, only the sample questions from the translation files are answered.

const API_URL = process.env.REACT_APP_KB_API_URL;

export const isLive = Boolean(API_URL);

const normalize = (text) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

export const findSample = (question, samples) => {
    const wanted = normalize(question);
    return samples.find((sample) => normalize(sample.q) === wanted) || null;
};

/**
 * @returns {Promise<{answer: string, sources: string[]} | null>} null when there is no answer yet.
 */
export const askKnowledgeBase = async (question, { samples = [], lang = 'es' } = {}) => {
    if (!isLive) {
        const sample = findSample(question, samples);
        return sample ? { answer: sample.a, sources: sample.src || [] } : null;
    }

    const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, lang }),
    });
    if (!response.ok) {
        throw new Error(`Knowledge base request failed with status ${response.status}`);
    }
    const data = await response.json();
    return { answer: data.answer, sources: data.sources || [] };
};
