const express = require('express');
const colors = require('colors');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const http = require('http');
const app = express();
const server = http.createServer(app);

const {
  logError,
  returnError,
  isOperationalError,
} = require('./middleware/error');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected successfully to database'.blue.bold);
});

db.on('error', error => {
  console.log(`Error occured connecting to MongoDB: ${error}`.red.bold);
});

// Router imports
//const routerSmth = require('./routerSmth');
const routesUser = require('./routes/routesUser');
const routesRestaurant = require('./routes/routesRestaurant');

const port = 4000;

app.use(morgan('dev'));
app.use(express.json());

// Router mounts
//app.use('/test', routerSmth);
app.use('/user', routesUser);
app.use('/restaurant', routesRestaurant);

// // 404 Route
// app.get('*', (req, res) => {
//   res.status(404).send('Page not found');
// });

//Error handlers, should be at bottom
app.use(logError);
app.use(returnError);

server.listen(port, () => {
  console.log(`Listening on port ${port}`.yellow.bold);
});
