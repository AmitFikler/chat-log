const User = require('../models/Users');

exports.loginNewUser = (req, res) => {
  console.log(req.body);
  const { username, color } = req.body;
  const usernameData = new User({ username, color });
  usernameData.save().then(res.send('data saved'));
};

exports.getAllUsers = async (req, res) => {
  const usersList = await User.find({});
  res.send(usersList);
};
