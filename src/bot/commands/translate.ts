import { Message } from "whatsapp-web.js";
import { getAIResponse } from "../../services/openai";
import { sessionStore } from "../../state/sessionStore";

export async function translateCommand(message: Message) {
  const history = sessionStore.getHistory(message.from);
  if (history.length === 0) {
    await message.reply("Nothing to translate yet! Let's talk first.");
    return;
  }

  const sentence = history[history.length - 1].content;

  await message.reply("Translating...");

  const translation = await getAIResponse(
    `
  Translate this English sentence to Brazilian Portuguese:
  "${sentence}"
  Return only the translation.
  `,
    [],
  );

  await message.reply(translation);

  sessionStore.addMessage(message.from, {
    role: "assistant",
    content: translation,
  });
}
