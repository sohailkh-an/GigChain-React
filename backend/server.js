require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// const corsOptions = {
//   // origin: 'http://localhost:5173',
//   origin: 'https://gigchain-frontend.vercel.app',
//   optionsSuccessStatus: 200
//   };

// app.use(cors(corsOptions));

const corsOptions = {
  origin:  'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
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

