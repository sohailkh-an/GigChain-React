const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Proposal = require("../models/Proposal");
const authMiddleware = require("../middleware/auth");

router.post("/accept-proposal", authMiddleware, async (req, res) => {
  const {
    proposalId,
    clientId,
    freelancerId,
    serviceId,
    conversationId,
    budget,
    deadline,
    status,
  } = req.body;
  try {
    const project = await Project.create({
      clientId,
      proposalId,
      freelancerId,
      serviceId,
      conversationId,
      status,
      budget,
      deadline,
    });
    res.status(200).json({ message: "Project created successfully", project });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.get("/get-projects", async (req, res) => {
  try {
    const freelancerId = "6703ebe0f82b0821da8455a5";
    const freelancerProjects = await Project.find({
      freelancerId,
    }).exec();

    console.log("freelancerProjects", freelancerProjects);

    if (freelancerProjects.length === 0) {
      return res.status(200).json({ message: "No projects found" });
    }
    res.status(200).json({ projects: freelancerProjects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


router.get("/all-projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });

    console.log("projects", projects);
  } catch (error) {}
});

module.exports = router;
