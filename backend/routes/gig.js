const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const gigs = await Gig.find({ title: { $regex: query, $options: "i" } });
    res.json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.get("/search", async (req, res) => {
//   const { query } = req.query;
//   try {
//     const gigs = await Gig.find({ title: { $regex: query, $options: "i" } }).limit(5);
//     res.json(gigs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get("/category/:mainCategory/:subCategory", async (req, res) => {
  const { subCategory } = req.params;
  try {
    const gigs = await Gig.find({
      category: subCategory,
    }).sort({ _id: -1 });

    console.log("Gigs found: ", gigs);

    if (gigs.length === 0) {
      return res.status(404).json({ message: "No gigs found" });
    }

    res.json(gigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/category/:category", async (req, res) => {
  // console.log("Fetching featured gigs");
  const { category } = req.params;
  try {
    // const gigs = await Gig.find({ category});
    const gigs = await Gig.find({ category }).sort({ _id: -1 }).limit(3);
    res.json(gigs);
    if (!gigs) {
      return res.status(404).json({ message: "No gigs found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const { gigId } = req.params;
    // console.log(gigId);
    const userId = req.user._id;
    const gigs = await Gig.find({ user: userId });
    res.json({ gigs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  next();
});

const ethers = require("ethers");
const GigFactoryArtifact = require("../../smart-contracts/artifacts/contracts/GigFactory.sol/GigFactory.json");

router.post(
  "/create",
  authMiddleware,
  upload.single("thumbnailImage"),
  async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      const {
        title,
        description,
        price,
        category,
        serviceProvider,
        providerProfilePicture,
        gigAddress,
      } = req.body;
      const userId = req.user._id;
      const thumbnailUrl = req.file.location;

      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );
      const gigFactoryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const gigFactoryContract = new ethers.Contract(
        gigFactoryAddress,
        GigFactoryArtifact.abi,
        provider
      );

      // const gigDetails = await gigFactoryContract.gigs(gigId);
      // if (gigDetails.title !== title) {
      //   return res
      //     .status(400)
      //     .json({ message: "Gig details do not match blockchain data" });
      // }

      const gig = new Gig({
        title,
        description,
        price,
        category,
        thumbnailUrl,
        user: userId,
        serviceProvider,
        providerProfilePicture,
        gigAddress,
      });

      await gig.save();

      res.status(201).json({ message: "Gig created successfully", gig });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);



router.put("/:gigId", async (req, res) => {
  try {
    const { gigId } = req.params;
    const { title, description, price, category, thumbnailUrl } = req.body;
    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // if (gig.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }

    gig.title = title;
    gig.description = description;
    gig.price = price;
    gig.category = category;
    gig.thumbnailUrl = thumbnailUrl;
    gig.updatedOn = new Date();

    await gig.save();

    res.json({ message: "Gig updated successfully", gig });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:gigId", async (req, res) => {
  try {
    const { gigId } = req.params;
    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // if (gig.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Unauthorized" });
    // }

    await Gig.findByIdAndDelete(gigId);

    res.json({ message: "Gig deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:gigId", async (req, res) => {
  try {
    const { gigId } = req.params;
    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json({ gig });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

