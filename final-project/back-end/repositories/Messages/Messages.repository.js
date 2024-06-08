const Message = require('../../models/Messages/Messages.model');

class MessageRepository{
    constructor() { }
    
    async createMessage(senderId, receiverId, content) {
        const message = new Message({ sender: senderId, receiver: receiverId, content });
        return message.save();
    }

}


module.exports = MessageRepository;
