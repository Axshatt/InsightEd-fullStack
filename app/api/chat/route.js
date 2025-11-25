import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // safer than hardcoding
  defaultHeaders: {
    "HTTP-Referer": "https://insighted.ai", // optional
    "X-Title": "InsightEd Chatbot", // optional
  },
});

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    // Build messages array with conversation history
    const messages = [
        {
          role: "system",
          content: `You are InsightEd, a helpful and friendly academic assistant.
          You ONLY answer questions related to studies, student life, exams, or academics.
          If asked something unrelated, respond with:
          "I'm only here to help with your studies and academic life 😊"`,
        },
    ];

    // Add conversation history (excluding thinking messages)
    history.forEach((msg) => {
      if (msg.sender === "user") {
        messages.push({ role: "user", content: msg.text });
      } else if (msg.sender === "bot" && msg.text !== "⏳ Thinking...") {
        messages.push({ role: "assistant", content: msg.text });
      }
    });

    // Add current user message
    messages.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      model: "alibaba/tongyi-deepresearch-30b-a3b:free",
      messages: messages,
    });

    const reply = completion.choices[0].message.content.trim();
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ reply: "⚠️ Sorry, something went wrong." }),
      { status: 500, headers: { "Content-Type": "application/json" }}
    );
  }
}
