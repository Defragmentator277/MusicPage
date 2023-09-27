const express = require('express');
const mongoose = require('mongoose');
//
const Artist = require('../../../model/artist');
const suppFunc = require('../../suppFunc');
//
const songsRouter = require('./song');
const albumRouter = require('./album');
//
const router = express.Router();

router.post('/find', (req, res) => {
    const cond = req.body;
    //
    const pipelines = cond.pipelines || [];
    const match = cond.match || {};

    Artist.aggregate([
        { $match: match }
    ].concat(pipelines))
    .then(
    (artist) => res.json(suppFunc.getAnswer(artists)),
    (err) => res.json(suppFunc.getError(err)));
});

router.post('/findById', (req, res) => {
    const cond = req.body;
    //
    const id = cond.idArtist

    Artist.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },

        // { $unwind: '$albums' },
        // { $unwind: '$albums.songs' },
        // { $set: 
        //     { 'src': { 
        //         $ifNull: [ '$src', { $convert: { input: '$_id', to: 'string' } } ] } 
        //     } 
        // },
        // //
        // { $set: 
        //     { 'albums.src': { 
        //         $ifNull: [ '$albums.src', { $convert: { input: '$albums.id', to: 'string' } } ] } 
        //     } 
        // },
        // //
        // { $set: 
        //     { 'albums.songs.src': { 
        //         $ifNull: [ '$albums.songs.src', { $convert: { input: '$albums.songs.id', to: 'string' } } ] } 
        //     } 
        // },
        // { $group: { _id: "$_id" }}
        // { $unset: 'albums' }
    ])
    .then(
    (artists) => res.json(suppFunc.getAnswer(artists[0], artists.length == 1)),
    (err) => res.json(suppFunc.getError(err)));
});
//
router.use('/album', albumRouter);
//
router.use('/song', songsRouter);

module.exports = router;