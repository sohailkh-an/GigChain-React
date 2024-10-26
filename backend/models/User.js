const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: false },
    profilePictureUrl: { type: String, required: true },
    coverPictureUrl: { type: String, required: true },

    location: {
      city: {
        type: String,
        
      },
      country: {
        type: String,
      },
    },

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
  },
  {
    timestamps: true,
  },
  {
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
