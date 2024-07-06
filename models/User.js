const {Schema, model} = require(`mongoose`);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator: function(email) {
        return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(email);
      },
      message: props => `${props.value} is not a valid email.`
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: `thought`,
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: `user`,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual(`friendCount`).get(function () {
  return this.friends.length;
});

const User = model(`user`, userSchema);

module.exports = User;