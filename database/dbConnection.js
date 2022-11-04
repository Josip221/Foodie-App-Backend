const mongoose = require('mongoose');

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

module.exports = db;
