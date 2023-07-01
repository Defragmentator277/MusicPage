const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//routers
const userRouter = require('./modules/routers/user/index');
const artistRouter = require('./modules/routers/artist/index');
//
const User = require('./model/user');
const suppFunc = require('./modules/suppFunc');
// 
const app = express();
const port = 3000;
const urlDB = 'mongodb://localhost:27017/MusicDB';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Connect to Database
app.use('/api', (req, res, next) => {
    mongoose.connect(urlDB, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
    })
    .then((ans) => {
        console.log('Success connect');
        next();
    })
    .catch((err) => res.json(suppFunc.getError(err)))
});
//user related routes
app.use('/api/user', userRouter);
//artist related routes
app.use('/api/artist', artistRouter);

app.listen(port, () => console.log('Server listening on port: ' + port));