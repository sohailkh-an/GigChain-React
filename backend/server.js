require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://gigchain-frontend.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


// app.use(cors());


// const corsOptions = {
//   origin:  '*',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     // "https://gigchain-frontend.vercel.app"
//     req.headers.origin
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
//   next();
// });


// app.use((req, res, next) => {
//   console.log('Incoming Request:', req.method, req.path);
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);
//   next();
// });



// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", '*');
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

//   if (req.method === "OPTIONS") {
//     res.sendStatus(204);
//   } else {
//     next();
//   }
// });

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

