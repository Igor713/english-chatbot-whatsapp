interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const sessions = new Map<string, ChatMessage[]>();

const MAX_HISTORY = 10;

export const sessionStore = {
  getHistory(userId: string): ChatMessage[] {
    return sessions.get(userId) || [];
  },

  addMessage(userId: string, message: ChatMessage) {
    const history = this.getHistory(userId);
    history.push(message);

    if (history.length > MAX_HISTORY) {
      history.shift();
    }

    sessions.set(userId, history);
  },

  clearHistory(userId: string) {
    sessions.delete(userId);
  },
};
