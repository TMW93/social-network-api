const {User, Thought} = require(`../models`);

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

      res.status(200).json({message: `User successfully created.`});

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId}, 
        {$set: req.body}, 
        {runValidators: true, new: true}
      );
      
      if(!user) {
        return res.status(404).json({message: `No user with this ID.`});
      }

      res.status(200).json({message: `User data updated.`});

    } catch (error) {
      res.status(500).json(error);
    }  
  },
  //delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({_id: req.params.userId});

      if(!user) {
        return res.status(404).json({message: `No user with this ID.`});
      }

      await Thought.deleteMany({_id: {$in: user.thoughts}});

      res.status(200).json({message: `User and associated thoughts deleted.`})

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //adding a user as a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet: {friends: req.params.friendId}},
        {new: true}
      );

      if(!user) {
        return res.status(404).json({message: `User Id or friend Id invalid.`});
      }

      const friend = await User.findOneAndUpdate(
        {_id: req.params.friendId},
        {$addToSet: {friends: req.params.userId}},
        {new: true}
      );

      res.status(200).json(`Friend successfully added.`);

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //deleting a user from friendlist
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {new: true}
      );

      if(!user) {
        return res.status(404).json({message: `No user with this ID.`});
      }

      const friend = await User.findOneAndUpdate(
        {_id: req.params.friendId},
        {$pull: {friends: req.params.userId}},
        {new: true}
      );

      res.status(200).json({message: `User removed from friendlist.`});

    } catch (error) {
      res.status(500).json(error);
    }
  }
};