import OpenAI from "openai";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateAIReply(message: string, context: string[] = []) {
  if (!client) {
    return {
      reply: "A IA ainda não está configurada. Adicione OPENAI_API_KEY para ativar o assistente.",
      confidence: 0.2,
    };
  }

  const systemPrompt = `Você é o assistente de IA da LocalBoost, especializado em negócios locais. Responda em português brasileiro, de forma profissional, útil e natural. Use o contexto fornecido quando houver informações de produtos, preços, horários, FAQs e dados da empresa. Se faltar informação, faça perguntas curtas para completar. Sempre seja amigável e nunca invente dados.`;

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: systemPrompt },
      { role: "system", content: `Contexto da empresa:\n${context.join("\n")}` },
      { role: "user", content: message },
    ],
  });

  return {
    reply: completion.output_text || "Não consegui gerar uma resposta no momento.",
    confidence: 0.95,
  };
}
