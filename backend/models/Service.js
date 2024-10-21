const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: [{ type: String }],
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  serviceProvider: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  providerProfilePicture: {
    type: String,
    default:
      "https://servicesthumbnailbucket.s3.ap-south-1.amazonaws.com/profile_avatar.jpg",
  },
  completedProjects: {
    type: Number,
    default: 0,
  },
  tags: [{ type: String }],
  startingPrice: {
    type: Number,
    required: true,
  },
});

serviceSchema.pre("save", function (next) {
  this.updateOn = new Date();
  next();
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
