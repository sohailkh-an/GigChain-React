const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema(
  {
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    budget: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "in_progress", "completed"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", ProposalSchema);

module.exports = Proposal;
