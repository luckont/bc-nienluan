const { response } = require('../../app');
const authService = require('../services/authService');
const UsersService = require( '../services/user.service');
const MongoDB = require("../utils/mongodb.util");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const auth = new UsersService(MongoDB.client);
      const user = await auth.findName({username: username});
     
      if(!user)  return res.status(400).json({message: 'Username not found'})
      if(user.password !== password) return res.status(400).json({message: 'password invalid'})
      // res.json({ token });

      return res.status(200).json({state:'success',username,id:user._id,mssv:user.mssv})

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

};
