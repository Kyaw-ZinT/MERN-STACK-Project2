const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.register = async function (name, email, password) {
  let userEmail = await this.findOne({ email });

  if (userEmail) {
    throw new Error("email already existed");
  }

  let salt = await bcrypt.genSalt();
  let hashValue = await bcrypt.hash(password, salt);

  let user = await this.create({
    name,
    email,
    password: hashValue,
  });
  return user;
};

userSchema.statics.login = async function (email, password) {
  let user = await this.findOne({ email });

  if (!user) {
    throw new Error("user does not exist");
  }

  let isCorrect = await bcrypt.compare(password, user.password);

  if (isCorrect) {
    return user;
  } else {
    throw new Error("password incorrect");
  }
};

module.exports = mongoose.model("User", userSchema);
