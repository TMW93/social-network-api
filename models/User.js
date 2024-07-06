const {Schema, model} = require(`mongoose`);

const validateEmail = (email) => {
  const checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return checker.test(email);
};

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
      validate: [validateEmail, `Invalid Email.`],
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