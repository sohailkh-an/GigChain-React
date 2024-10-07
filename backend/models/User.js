const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userType: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: false },
  profilePictureUrl: { type: String, required: true },
  coverPictureUrl: { type: String, required: true },
  expertise: {
    type: String,
    default: "",
  },
  languages: {
    type: [String],
    default: [],
  },
  about: {
    type: String,
    default: "",
  },
  verificationCode: String,
  verificationCodeExpires: Date,
  isVerified: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", UserSchema);
