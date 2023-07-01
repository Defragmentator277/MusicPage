const express = require('express');
const mongoose = require('mongoose');
//
const Artist = require('../../../model/artist');
const suppFunc = require('../../suppFunc');
//
const songsRouter = require('./song');
//
const router = express.Router();

router.post('/find', (req, res) => {
    const cond = req.body;
    //
    const _id = cond._id

    Artist.findOne({ _id: new mongoose.Types.ObjectId(_id) })
    .then(
        (artist) => res.json(suppFunc.getAnswer(artist)),
        (err) => res.json(suppFunc.getError(err)))
    })
//
router.use('/song', songsRouter);

module.exports = router;