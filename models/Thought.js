const {Schema, model} = require(`mongoose`);

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

const formatTime = (date) => {
  return date.toLocaleString();
};

const Thought = model(`thought`, thoughtSchema);

module.exports = Thought;