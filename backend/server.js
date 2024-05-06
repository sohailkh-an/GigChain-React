require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
<<<<<<< HEAD
  origin:  'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
=======
  origin: "https://gigchain-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
>>>>>>> a6ab6f256e5637576b32ed800f6d8bcf6e691e8c
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
<<<<<<< HEAD
  res.setHeader(
    "Access-Control-Allow-Origin",
    req.headers.origin
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.path);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:5173');
=======
  res.setHeader("Access-Control-Allow-Origin", "https://gigchain-frontend.vercel.app");
>>>>>>> a6ab6f256e5637576b32ed800f6d8bcf6e691e8c
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const gigRoutes = require("./routes/gig");
app.use("/api/gig", gigRoutes);

