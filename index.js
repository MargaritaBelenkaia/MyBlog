const express   = require('express');
const app       = express();
const config    = require('./config/database');
const mongoose  = require('mongoose');
const db        = mongoose.connection;
const path      = require('path');
const port      = process.env.PORT || 3000;

mongoose.connect ('mongodb://localhost:27017/BlogDB', { useMongoClient: true, promiseLibrary: global.Promise });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.static(__dirname + '/client/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen (port, function() {
  console.log ("Running on port " + port);
//   console.log (config.uri);
//   console.log (config.db);
//   console.log (config.secret);

});


module.exports = app;