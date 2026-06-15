function buildPrompt(
    question,
    context
) {

    return `

You are an SOP assistant.

Answer ONLY using the provided context.

If the answer is not explicitly present in the context, reply exactly:

"I don't know based on uploaded SOPs."

Do not make up information.
Do not guess.
Do not use outside knowledge.

Context:
${context}

Question:
${question}

Answer:
`;
}

module.exports =
    buildPrompt;