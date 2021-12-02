const Message = require('../models/Message');

exports.newMessage = (req, res) => {
  const { username, message } = req.body;
  const usernameData = new Message({ username, message });
  usernameData.save().then(res.send('message saved'));
};

exports.getAllMessage = async (req, res) => {
  const messageList = await Message.find({});
  res.send(messageList);
};
