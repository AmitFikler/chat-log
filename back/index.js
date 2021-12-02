require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'production';
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;
const loginRouter = require('./routers/login');

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`connected to MongoDB - ${env}`);
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors()); //cors middleware
app.use(express.static(`${__dirname}/client/build`));
app.use('/login', loginRouter);

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
