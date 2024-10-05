const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  
  gigAddress: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
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
    default: "active",
  },
  providerProfilePicture: {
    type: String,
    default:
      "https://servicesthumbnailbucket.s3.ap-south-1.amazonaws.com/profile_avatar.jpg",
  },

  // reviews: [
  //   {
  //     name: { type: String, required: true },
  //     rating: { type: Number, required: true },
  //     comment: { type: String, required: true }
  //   }
  // ]
});

const Gig = mongoose.model("Gig", gigSchema);

module.exports = Gig;
