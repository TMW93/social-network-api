const User = require(`../models/User`);

module.exports = {
  //getting all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //getting a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
        .select(`-__v`);

      if(!user) {
        return res.status(404).json({message: `No user with that ID.`});
      }

      res.json(user);

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //create a new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {runValidators: true, new: true});
      
      if(!user) {
        return res.status(404).json({message: `No user with this ID.`});
      }

      res.status(200).json(user);

    } catch (error) {
      res.status(500).json(error);
    }  
  }
};