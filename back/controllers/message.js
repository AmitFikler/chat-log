const Message = require('../models/Message');

exports.newMessage = async (req, res) => {
  try {
    const { username, message, color } = req.body;
    const usernameData = new Message({ username, message, color });
    await usernameData.save();
    res.send('message send');
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.getAllMessage = async (req, res) => {
  const messageList = await Message.find({});
  res.send(messageList);
};
