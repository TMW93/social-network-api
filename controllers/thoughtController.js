const {Thought, User} = require(`../models`);

module.exports = {
  //get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);  

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //getting a thought by id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtId});

      if(!thought) {
        return res.status(404).json({message: `No thought with that ID.`});
      }

      res.json(thought);

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {username: req.body.username},
        {$addToSet: {thoughts: thought._id}},
        {new: true}
      );

      if(!user) {
        return res.status(404).json({message: `Please enter a valid username.`});
      }

      res.json(`Thought created.`);

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update a thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {new: true});

      if(!thought) {
        return res.status(404).json({message: `No thought with this ID.`});
      }

      res.status(200).json(thought);

    } catch (error) {
      res.status(500).json(error);
    }
  },
  //delete a thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

      if(!thought) {
        return res.status(404).json({message: `No thought with this ID.`});
      }

      const user = await User.findOneAndUpdate(
        {thoughts: req.params.thoughtId},
        {$pull: {thoughts: req.params.thoughtId}},
        {new: true}
      );

      if(!user) {
        return res.status(404).json({message: `Thought deleted, but no user with this ID.`});
      }

      res.status(200).json({message: `Thought successfully deleted.`});

    } catch (error) {
      res.status(500).json(error);
    }
  }
};