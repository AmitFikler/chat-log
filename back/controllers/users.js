const User = require('../models/Users');

exports.loginNewUser = async (req, res) => {
  try {
    const { username, color } = req.body;
    const usernameData = new User({ username, color });
    await usernameData.save();
    res.send('user saved');
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.getAllUsers = async (req, res) => {
  const usersList = await User.find({});
  const usernamesList = usersList.map((user) => user.username);
  console.log('update');
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',

    // enabling CORS
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  });
  res.write(`data: ${JSON.stringify(usernamesList)}\n\n`);
};
