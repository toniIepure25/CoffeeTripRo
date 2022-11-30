const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

UserSchema.methods.matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(this.password, salt);
    this.password = hasedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
