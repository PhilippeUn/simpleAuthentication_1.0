const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },

  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to db');
    }
  }
);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// required apis
const authRouter = require('./routes/authRouter')

app.use('/api', authRouter)

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on PORT', 4000);
  }
});