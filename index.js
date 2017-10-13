const express   = require('express');
const app       = express();
const router    = express.Router();
const config    = require('./config/database');
const mongoose  = require('mongoose');
const db        = mongoose.connection;
const path      = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors      = require('cors');
const port      = process.env.PORT || 3000;


mongoose.connect (config.uri, { useMongoClient: true, promiseLibrary: global.Promise });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// MIDDLEWARE

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client/dist'));
app.use('/authentication', authentication);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen (port, function() {
  console.log ("Running on port " + port);
});

module.exports = app;

  
  