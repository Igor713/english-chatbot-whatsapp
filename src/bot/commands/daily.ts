import { Message } from "whatsapp-web.js";
import { delay } from "../../utils/delay";
import { getAIResponse } from "../../services/openai";
import { sessionStore } from "../../state/sessionStore";

export async function dailyCommand(message: Message) {
  await message.reply("Today's topic:");
  await delay(2000);

  const dailyTopic = await getAIResponse(
    "Suggest ONE interesting and engaging topic for an English conversation practice. It should spark discussion. Return ONLY the topic name.",
    [],
  );

  await message.reply(`Today's topic: *${dailyTopic}*! 🚀\n\nLet's practice! What do you think about this?`);

  sessionStore.addMessage(message.from, {
    role: "assistant",
    content: `Context: We are now practicing English specifically about the topic "${dailyTopic}". I will help the user practice by asking questions and correcting their English.`,
  });
}
