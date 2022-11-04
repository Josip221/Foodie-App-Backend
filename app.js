const colors = require('colors');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const db = require('./database/dbConnection');

const { logError, returnError } = require('./middleware/error');

// Router imports
//const routerSmth = require('./routerSmth');
const routesUser = require('./routes/routesUser');
const routesRestaurant = require('./routes/routesRestaurant');

const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());

// Router mounts
app.use('/user', routesUser);
app.use('/restaurant', routesRestaurant);

//Error handlers, should be at bottom
app.use(logError);
app.use(returnError);

io.on('connection', socket => {
  console.log(`New connection: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`.yellow.bold);
});
