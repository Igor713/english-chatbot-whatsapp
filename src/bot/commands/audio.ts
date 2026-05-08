import { Message, MessageMedia } from "whatsapp-web.js";
import { getAIResponse, getTTSResponse } from "../../services/openai";
import { sessionStore } from "../../state/sessionStore";

export async function audioCommand(message: Message) {
  const audioPrompt = await getAIResponse(
    `
  Generate ONE short and natural English sentence
  that people actually use in everyday conversation.

  Rules:
  - Sound casual and realistic
  - Use contractions when natural
  - Max 24 words
  - No motivational phrases
  - No textbook English
  - No greetings
  - No quotes
  - Return ONLY the sentence

  Good examples:
  - I'm running late today.
  - Did you already eat?
  - I need coffee right now.
  - That makes sense.
  - I'm too tired to cook tonight.
  `,
    [],
  );

  const response = await getTTSResponse(audioPrompt);
  const buffer = Buffer.from(response);
  const media = new MessageMedia("audio/mpeg", buffer.toString("base64"));
  await message.reply(media);

  sessionStore.addMessage(message.from, {
    role: "assistant",
    content: audioPrompt,
  });
}
