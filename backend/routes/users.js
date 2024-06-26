const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

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



router.get("/user/:userId", async (req, res) => {
  console.log("This is the userid in user api endpoint ", req.params.userId);
  try {
    const {userId} = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/user/:userId/update", async (req, res) =>{
  try {
    const {userId} = req.params;
    const {name, expertise, languages, about} = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.name = name;
    user.expertise = expertise;
    user.languages = languages;
    user.about = about;
    await user.save();
    res.json({ msg: "User updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

})


router.post("/register", async (req, res) => {
  const defaultAvatar =
    "https://servicesthumbnailbucket.s3.ap-south-1.amazonaws.com/profile_avatar.jpg";
  const defaultCover =
    "https://servicesthumbnailbucket.s3.ap-south-1.amazonaws.com/defaultCover.png";

  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({
      name,
      email,
      password,
      profilePictureUrl: defaultAvatar,
      coverPictureUrl: defaultCover,
    });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      name: { $regex: query, $options: 'i' } 
    });
    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Incorrect email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePictureUrl: user.profilePictureUrl,
        coverPictureUrl: user.coverPictureUrl,
        expertise: user.expertise,
        languages: user.languages,
        about: user.about
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload.user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/user", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    const userId = decoded.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:userId/profile-picture", async (req, res) => {
 
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(408).json({ msg: "User not found" });
    }

    res.json({ profilePictureUrl: user.profilePictureUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/:userId/profile-picture",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (!req.file) {
        return res.status(400).json({ msg: "No profile picture uploaded" });
      }

      user.profilePictureUrl = req.file.location;
      await user.save();

      res.json({ msg: "Profile picture uploaded successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);



router.get("/:userId/cover-picture", async (req, res) => {
  console.log(
    "This is the userid in profile picture api endpoint ",
    req.params.userId
  );
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(408).json({ msg: "User not found" });
    }

    res.json({ coverPictureUrl: user.coverPictureUrl });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/:userId/cover-picture",
  upload.single("coverPicture"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (!req.file) {
        return res.status(400).json({ msg: "No cover picture uploaded" });
      }

      user.coverPictureUrl = req.file.location;
      await user.save();

      res.json({ msg: "Cover picture uploaded successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
