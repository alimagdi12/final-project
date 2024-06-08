// repositories/chat/chat.repository.js

class ChatRepository {
    constructor() {
        this.messages = []; // In-memory message storage, replace with database in production
    }

    async saveMessage(userId, message) {
        const chatMessage = {
            userId,
            message,
            timestamp: new Date(),
        };
        this.messages.push(chatMessage);
        return chatMessage;
    }

    async getMessages() {
        return this.messages;
    }
}

module.exports = ChatRepository;
