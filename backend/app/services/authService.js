const jwt = require('jsonwebtoken');
const User = require('../services/user.service');

async function authenticate(username, password) {
  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = {
  authenticate,
};
