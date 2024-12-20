const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: {
      type: String,
      enum: ["freelancer", "employer"],
      required: false,
      default: "employer",
    },
    googleId: { type: String, required: false },
    provider: { type: String, required: false },
    lastLogin: { type: Date, required: false },
    email: { type: String, unique: true },
    password: { type: String, required: false },
    profilePictureUrl: { type: String, required: false },
    coverPictureUrl: { type: String, required: false },
    isVerified: { type: Boolean, default: false },
    verificationCode: String,
    verificationCodeExpires: Date,
    walletAddress: { type: String, required: false },
    location: {
      timezone: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.virtual("localTime").get(function () {
  if (!this.location.timezone) return null;
  return new Date().toLocaleTimeString("en-US", {
    timezone: this.location.timezone,
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
});

module.exports = mongoose.model("User", UserSchema);
