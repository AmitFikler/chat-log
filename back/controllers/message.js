const Message = require('../models/Message');

let clients = [];

exports.newMessage = async (req, res) => {
  try {
    const { username, message, color } = req.body;
    const messageData = new Message({ username, message, color });
    await messageData.save();
    res.send('message send');
    return sendToAll(messageData);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.getAllMessage = async (req, res) => {
  const messageList = await Message.find({});
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',

    // enabling CORS
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  });

  res.write(`data: ${JSON.stringify(messageList)}\n\n`);
  const newClient = {
    res,
  };
  clients.push(newClient);
};

function sendToAll(msg) {
  console.log(clients);
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(msg)}\n\n`));
}
