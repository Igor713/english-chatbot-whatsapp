import { Message } from "whatsapp-web.js";

export async function startCommand(message: Message) {
  await message.reply(
    "Hello! I am your English Trainer Bot. 🤖\n\n" +
      "You can talk to me in English and I will help you practice and correct your mistakes.\n\n" +
      "*Available Commands:*\n" +
      "- *Daily*: Get a conversation topic.\n" +
      "- *Reset*: Clear our conversation history. \n" +
      "- *Audio*: Get the audio message to practice your listening and speaking skills.\n" +
      "- *Translate*: Translate the last sentence to brazilian portuguese\n" +
      "You can also just talk to me in english if you want.",
  );
}
