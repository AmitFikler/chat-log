const User = require('../models/Users');

let clients = [];

exports.loginNewUser = async (req, res) => {
  try {
    const { username, color } = req.body;
    const usernameData = new User({ username, color });
    await usernameData.save();
    res.send('user saved');
    return sendToAll(usernameData);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const clientId = req.query.username;
    const usersList = await User.find({});
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',

      // enabling CORS
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
    res.write(`data: ${JSON.stringify(usersList)}\n\n`);
    const newClient = {
      id: clientId,
      res,
    };
    clients.push(newClient);

    req.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter((c) => c.id !== clientId);
      User.findOneAndDelete({ username: clientId }, async (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          const usersWithout = await User.find({});
          sendToAll(usersWithout);
        }
      });
    });
  } catch (error) {
    res.status(401).send(error);
  }
};

function sendToAll(user) {
  console.log(clients);
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(user)}\n\n`));
}
