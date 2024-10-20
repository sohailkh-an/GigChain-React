const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const Service = require("../models/Service");
const User = require("../models/User");

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
    const services = await Service.find({
      title: { $regex: query, $options: "i" },
    });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.get("/search", async (req, res) => {
//   const { query } = req.query;
//   try {
//     const services = await Service.find({ title: { $regex: query, $options: "i" } }).limit(5);
//     res.json(services);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get("/category/:mainCategory/:subCategory", async (req, res) => {
  const { subCategory } = req.params;
  try {
    const services = await Service.find({
      category: subCategory,
    }).sort({ _id: -1 });

    console.log("Services found: ", services);

    if (services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/category/:category", async (req, res) => {
  // console.log("Fetching featured services");
  const { category } = req.params;
  try {
    const services = await Service.find({ category })
      .sort({ _id: -1 })
      .limit(3);
    res.json(services);
    if (!services) {
      return res.status(404).json({ message: "No services found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const { serviceId } = req.params;
    // console.log(serviceId);
    const userId = req.user._id;
    const services = await Service.find({ user: userId });
    res.json({ services });
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

// const ethers = require("ethers");
// const ServiceFactoryArtifact = require("../../smart-contracts/artifacts/contracts/ServiceFactory.sol/ServiceFactory.json");

router.post(
  "/create",
  authMiddleware,
  upload.array("images", 5),
  async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      const {
        title,
        description,
        category,
        serviceProvider,
        "priceRange[min]": priceRangeMin,
        "priceRange[max]": priceRangeMax,
        "estimatedDeliveryTime[min]": estimatedDeliveryTimeMin,
        "estimatedDeliveryTime[max]": estimatedDeliveryTimeMax,
      } = req.body;

      const userId = req.user._id;
      const imageUrls = req.files.map((file) => file.location);

      const user = await User.findById(userId);
      const providerProfilePicture = user.profilePictureUrl;

      const service = new Service({
        title,
        description,
        category,
        user: userId,
        images: imageUrls,
        serviceProvider,
        providerProfilePicture,
        priceRange: {
          min: Number(priceRangeMin),
          max: Number(priceRangeMax),
        },
        estimatedDeliveryTime: {
          min: Number(estimatedDeliveryTimeMin),
          max: Number(estimatedDeliveryTimeMax),
        },
      });

      await service.save();

      res
        .status(201)
        .json({ message: "Service created successfully", service });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);

router.put("/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const {
      title,
      description,
      priceRange,
      estimatedDeliveryTime,
      category,
      thumbnailUrl,
    } = req.body;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    service.title = title;
    service.description = description;
    service.priceRange = priceRange;
    service.estimatedDeliveryTime = estimatedDeliveryTime;
    service.category = category;
    service.thumbnailUrl = thumbnailUrl;
    service.updatedOn = new Date();

    await service.save();

    res.json({ message: "Service updated successfully", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Service.findByIdAndDelete(serviceId);

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);
    const provider = await User.findById(service.user);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ service, provider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
