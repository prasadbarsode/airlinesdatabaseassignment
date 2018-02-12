const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//DB connect
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log("connected to database" +config.database);
});

mongoose.connection.on('error', (err) => {
    console.log("connected to database" +err);
});

const app = express();

const users = require('./routes/users');

//Port Number
const port = 3000;

//CORS middleware
app.use(cors());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

app.use('/users', users);

//Index route
app.get('/', (req, res, next) => {
    res.send('invalid endpoint');
});

//Start server
app.listen(port, () => {
    console.log('Server started on port'+port);
});
