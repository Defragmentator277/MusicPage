const express = require('express');
const User = require('../../../model/user');
const suppFunc = require('../../suppFunc');
// 
const router = express.Router();

//Authorization User
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({ username: username, password: password })
    .then(
    (user) => res.json(suppFunc.getAnswer(user)),
    (err) => res.json(suppFunc.getError(err)))
});

module.exports = router;