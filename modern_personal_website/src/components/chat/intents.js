/* Keyword matching for free-text messages (Spanish and English), checked in order.
   Placeholder until the RAG backend answers free-form questions. */
const INTENTS = [
    ['quote', /cotiz|precio|presupuest|cuanto cuesta|cuanto vale|tarifa|quote|price|pricing|cost|budget|rate/],
    ['contact', /contact|correo|email|mail|hablar|escribir|linkedin|github|talk|reach|hire|contrat/],
    ['ai', /\bia\b|\bai\b|inteligencia|artificial|\bbot\b|robot|\brag\b|\bllm|chatgpt|gpt/],
    ['experience', /experien|trayectoria|trabaj|empresa|bancolombia|tech and solve|carrera|\bcv\b|curricul|hoja de vida|career|resume|\bjob|\bwork/],
    ['services', /servic|ofrece|ofreces|haces|service|offer/],
    ['projects', /proyect|portafolio|portfolio|project|demo/],
    ['tech', /tecnolog|stack|lenguaj|herramient|java|react|python|aws|spring|docker|kubernetes|langchain|langgraph|tech|language|tools/],
];

const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const detectIntent = (text) => {
    const value = normalize(text);
    const match = INTENTS.find(([, pattern]) => pattern.test(value));
    return match ? match[0] : null;
};

export const isValidEmail = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text.trim());
