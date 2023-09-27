const express = require('express');
const mongoose = require('mongoose');
//'
const Artist = require('../../../model/artist');
const suppFunc = require('../../suppFunc');
//
const router = express.Router();

router.post('/findById', (req, res, next) => {
    // cond: { idArtist: ..., idAlbum: ... }
    const cond = req.body;
    //
    const idArtist = cond.idArtist;
    const idAlbum = cond.idAlbum;
    
    const pipelines = cond.pipelines || [];

    Artist.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(idArtist) } },
        { $unwind: '$albums'},
        { $match: { 'albums.id': new mongoose.Types.ObjectId(idAlbum) } },
    ]
    .concat(suppFunc.renameToSingleAlbumsAndSongs(true, false))
    .concat(pipelines))
    //
    .then(
    (albums) => res.json(suppFunc.getAnswer(albums[0])),
    (err) => res.json(suppFunc.getError(err)));
})

module.exports = router