# 🚀 English Trainer WhatsApp Bot

An AI-powered WhatsApp chatbot designed to help you practice English daily. It uses OpenAI's GPT models to act as a friendly tutor, suggesting topics, generating audio for listening practice, and correcting your grammar.

## ✨ Features

- **🤖 Interactive AI Tutor**: Chat naturally in English. The bot corrects your mistakes and encourages you.
- **📅 Daily Topics**: Use the `daily` command to get a new conversation starter every day.
- **🔊 Audio Practice**: Use the `audio` command to receive a natural English sentence in voice format to practice listening.
- **🇧🇷 Instant Translation**: Stuck? Use the `translate` command to see the Portuguese translation of the last sentence.
- **🧠 Session Memory**: The bot remembers the context of your conversation (up to 10 messages).
- **🔄 History Reset**: Use `reset` to clear the current context and start fresh.

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - WhatsApp API wrapper.
- [OpenAI API](https://openai.com/) - Powering the AI tutor (GPT-4o-mini) and Text-to-Speech.
- [tsx](https://github.com/privatenumber/tsx) - Fast TypeScript execution and watch mode.

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18 or higher)
- An OpenAI API Key

### 2. Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Igor713/english-chatbot-whatsapp.git
   cd english-chatbot-whatsapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   OPENAI_KEY=your_openai_api_key_here
   CHAT_ID=your_whatsapp_group_or_chat_id_here
   ```

### 3. Running the Bot

For development with auto-reload:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

### 4. Authentication
On the first run, a **QR Code** will appear in your terminal. Scan it with your WhatsApp (Linked Devices) to authenticate the bot.

## 🎮 Commands

| Command | Description |
| :--- | :--- |
| `start` | Show the welcome message and available commands. |
| `daily` | Generate an engaging English conversation topic. |
| `audio` | Generate a voice message with a natural English sentence. |
| `translate` | Translate the last sentence sent by the bot to Portuguese. |
| `reset` | Clear the conversation history. |

## 🛡️ License

Distributed under the MIT License.
