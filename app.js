require('colors');
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

// Socket handler imports
const { createChatroom } = require('./socketHandlers/socketHandler')(io);

// Router imports
const routesUser = require('./routes/routesUser');
const routesRestaurant = require('./routes/routesRestaurant');
const routesOrder = require('./routes/routesOrder');

const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());

// Router mounts
app.use('/user', routesUser);
app.use('/restaurant', routesRestaurant);
app.use('/order', routesOrder);

//Error handlers, should be at bottom
app.use(logError);
app.use(returnError);

const onConnection = socket => {
  socket.on('user:create-chatroom-with-courrier', createChatroom);
};

io.on('connection', onConnection);

server.listen(port, () => {
  console.log(`Listening on port ${port}`.yellow.bold);
});
