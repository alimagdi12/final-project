


class MessageController {
  constructor(MessageRepository) {
      this.MessageRepository = MessageRepository;
  }

  async createMessage(senderId, receiverId, content) {
    // Check if a conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
        // If conversation doesn't exist, create a new one
        conversation = new Conversation({
            participants: [senderId, receiverId]
        });
        await conversation.save();
    }

    // Create the message and add it to the conversation
    const message = new Message({ 
        conversation: conversation._id,
        sender: senderId, 
        content 
    });
    await message.save();

    // Update the conversation's messages array
    conversation.messages.push(message._id);
    await conversation.save();

    return message;
}

  async getMessagesForUser(req, res) {
      try {
        const {sender,receiver } = req.body;
        const messages = await this.MessageRepository.getMessagesForUser(sender,receiver);
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
