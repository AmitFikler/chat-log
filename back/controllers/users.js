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
  const clientId = req.query.username;
  const usersList = await User.find({});
  // const usernamesList = usersList.map((user) => user.username);
  // console.log('update');
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
    User.findOneAndDelete({ username: clientId }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs + 'deleted');
      }
    });
    clients = clients.filter((c) => c.id !== clientId);
  });
  req.on('open', (e) => {
    res.send(e);
  });
};

function sendToAll(user) {
  console.log(clients);
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(user)}\n\n`));
}
