require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  // origin: 'http://localhost:5173', 
  origin: 'https://gigchain-frontend.vercel.app/', 
  optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const gigRoutes = require('./routes/gig');
app.use('/api/gig', gigRoutes);

