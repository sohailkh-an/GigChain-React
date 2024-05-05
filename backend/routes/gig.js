const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
// const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const { S3Client } = require('@aws-sdk/client-s3');

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
    // acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});


// try {
//   aws.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
//   });
// } catch (err) {
//   console.log("Error occured updating AWS credentials:", err);
// }

// const s3 = new aws.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: "public-read",
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + "-" + file.originalname);
//     },
//   }),
// });

router.post(
  "/create",
  authMiddleware,
  upload.single("thumbnailImage"),
  async (req, res) => {
    try {
      const { title, description, price, category } = req.body;
      const userId = req.user._id;
      const thumbnailUrl = req.file.location;

      const gig = new Gig({
        title,
        description,
        price,
        category,
        thumbnailUrl,
        user: userId,
        serviceProvider: userId,
      });

      await gig.save();

      res.status(201).json({ message: "Gig created successfully", gig });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);


router.get('/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const gigs = await Gig.find({ user: userId });
    res.json({ gigs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
