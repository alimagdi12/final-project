const Message = require('../../models/Messages/Messages.model');
const Conversation = require('../../models/Conversation/conversation.model');
class MessageRepository{
    constructor() { }
    
    async createMessage(sender, receiver, content) {
        // Check if a conversation already exists between the sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        });

        if (!conversation) {
            // If conversation doesn't exist, create a new one
            conversation = new Conversation({
                participants: [sender, receiver]
            });
            await conversation.save();
        }

        // Create the message and add it to the conversation
        const message = new Message({ 
           receiver:receiver,
            sender: sender, 
            content :content
        });
        await message.save();
        // Update the conversation's messages array
        conversation.messages.push(message._id);
        await conversation.save();
        return message;
    }

    async getMessagesForUser(sender, receiver) {
        return Message.find({
            $or: [
                { sender: sender },
                { receiver: sender }
            ]
        })
        .populate('sender', 'firstName lastName email')
        .populate('receiver', 'firstName lastName email');
    }
    

    async deleteMessage(messageId) {
        return Message.findByIdAndDelete(messageId);
    }
}


module.exports = MessageRepository;
