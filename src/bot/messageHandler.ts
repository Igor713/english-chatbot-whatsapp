import { Message } from "whatsapp-web.js";
import { getAIResponse } from "../services/openai";
import { sessionStore } from "../state/sessionStore";
import { dailyCommand } from "./commands/daily";
import { startCommand } from "./commands/start";
import { audioCommand } from "./commands/audio";
import { translateCommand } from "./commands/translate";

export async function handleMessage(message: Message) {
  const body = message.body.trim().toLowerCase();
  const userId = message.from;

  if (!body) return;

  console.log(`[Bot] Mensagem recebida de ${userId}: ${body}`);

  switch (body) {
    case "start":
    case "oi":
    case "hi":
    case "hello":
    case "hey":
      await startCommand(message);
      return;

    case "daily":
      await dailyCommand(message);
      return;

    case "reset":
      sessionStore.clearHistory(userId);
      await message.reply("Conversation history cleared!");
      return;

    case "audio":
      await audioCommand(message);
      return;

    case "translate":
      await translateCommand(message);
      return;
  }

  const history = sessionStore.getHistory(userId);
  const response = await getAIResponse(message.body, history);

  sessionStore.addMessage(userId, { role: "user", content: message.body });
  sessionStore.addMessage(userId, { role: "assistant", content: response });

  await message.reply(response);
}
