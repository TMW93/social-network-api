const {Schema, model} = require(`mongoose`);
const Reaction = require(`./Reaction`);

const formatTime = (date) => {
  return date.toLocaleString();
};

const thoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatTime,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = model(`thought`, thoughtSchema);

module.exports = Thought;