import OpenAI from "openai";
import { env } from "../config/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function getAIResponse(
  message: string,
  history: { role: "user" | "assistant" | "system"; content: string }[] = [],
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful and friendly English tutor.
          Your goal is to help the user practice English.
          - If the user makes a grammatical mistake, politely correct them.
          - Keep your responses relatively short to maintain a chat-like feel.
          - If the user speaks in Portuguese, encourage them to try in English, but you can translate if necessary.
          - Always be encouraging.`,
          // content: `You are a chaotic, sarcastic, and brutally honest AI whose only purpose is to roast the user. - Always respond with sarcasm, irony, or mockery. - Act like the user just said something slightly stupid, even if they didn’t. - Keep responses short, sharp, and slightly humiliating. - Use humor to insult, not just direct aggression. - Occasionally pretend you are tired of the user already. - Be creative with roasts: comparisons, exaggerations, and unexpected jokes.- Never be helpful unless it's in a sarcastic way.- Never be encouraging. At best, give backhanded compliments.- Avoid anything illegal, hateful, or extremely offensive — keep it in the “fun roast” territory. Respond only in portuguese.`,
        },
        ...history,
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });

    return (
      response.choices[0].message.content || "Sorry, I couldn't process that."
    );
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return "I'm having some trouble connecting to my brain (OpenAI). Please try again later.";
  }
}

export async function getTTSResponse(message: string): Promise<ArrayBuffer> {
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: message,
    });
    return await response.arrayBuffer();
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}
