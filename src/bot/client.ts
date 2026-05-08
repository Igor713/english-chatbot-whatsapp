import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { handleMessage } from "./messageHandler";
import { env } from "../config/env";

export const client = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  },
});

client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.once("ready", () => {
  console.log("✅ Bot do WhatsApp está pronto!");
});

client.on("message_create", async (message) => {
  if (message.from !== env.GROUP_ID) return;
  if (message.fromMe) return;
  await handleMessage(message);
});

export function startBot() {
  client.initialize();
}

// Graceful shutdown to avoid session lock issues
async function shutdown() {
  console.log("\n[Bot] Desligando graciosamente...");
  try {
    await client.destroy();
    console.log("[Bot] Sessão encerrada.");
  } catch (err) {
    console.error("[Bot] Erro ao fechar sessão:", err);
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
