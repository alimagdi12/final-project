class MessageController {
  constructor(MessageRepository) {
      this.MessageRepository = MessageRepository;
  }

  async createMessage(req, res) {
      try {
          const { senderId, receiverId, content } = req.body;
          const message = await this.MessageRepository.createMessage(senderId, receiverId, content);
          res.status(201).json(message);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

  async getMessagesForUser(req, res) {
      try {
          const userId = req.params.userId;
          const messages = await this.MessageRepository.getMessagesForUser(userId);
          res.status(200).json(messages);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }

  async deleteMessage(req, res) {
      try {
          const messageId = req.params.messageId;
          await this.MessageRepository.deleteMessage(messageId);
          res.status(200).json({ message: 'Message deleted' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
}

module.exports = MessageController;
