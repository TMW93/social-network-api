const {Thought, User} = require(`../models`);

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res,json(thoughts);          
    } catch (error) {
      res.status(500).json(error);
    }
  },
};