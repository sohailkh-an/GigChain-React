const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');


router.use(authMiddleware);

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    // const conversations = await Conversation.find({}).populate('participants');
    const conversations = await Conversation.find({ participants: userId }).populate('participants');
    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { participant } = req.body; 
    // const currentUser = req.user; 
    // const userId = req.user._id;
    console.log("User ID coming from conversations api route: ", req.user);


    const conversation = new Conversation({
      participants: [req.user._id, participant]
    });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:conversationId/messages', async (req, res) => {
  try {
    const { conversationId } = req.params;
    console.log("Conversation ID in messages api endpoint(New): ", conversationId);
    const messages = await Message.find({ conversationId });
    console.log("Messages in messages api endpoint(New): ", messages);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
