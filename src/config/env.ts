import dotenv from "dotenv";
dotenv.config();

export const env = {
  OPENAI_API_KEY: process.env.OPENAI_KEY || "",
  GROUP_ID: process.env.CHAT_ID || "",
};

if (!env.OPENAI_API_KEY) {
  console.warn("⚠️  OPENAI_KEY não encontrada no arquivo .env");
}
