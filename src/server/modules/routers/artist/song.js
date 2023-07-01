const express = require('express');
const Artist = require('../../../model/artist');
const suppFunc = require('../../suppFunc');
//
const router = express.Router();

router.use('/', (req, res, next) => {
    const cond = req.body;
    //
    if(!cond.pipelines)
        cond.pipelines = [];

    switch(cond.type)
    {
        case 'forSongBlock':
            //Preparation for give info to songBlock
            cond.pipelines = [{ 
                $project: {
                    'description': 0, 
                    'year': 0,
                    'likes': 0,

                    'albums.year': 0,
                }},
                //Rename albums to album, songs to songs
                { $set: { 'album': '$albums' } }, { $unset: 'albums' },
                { $set: { 'album.song': '$album.songs' } }, { $unset: 'album.songs' },

                { $set: 
                    { 'src': { 
                        $ifNull: [ '$src', { $convert: { input: '$_id', to: 'string' } } ] } 
                    } 
                },
                //
                { $set: 
                    { 'album.src': { 
                        $ifNull: [ '$album.src', { $convert: { input: '$album.id', to: 'string' } } ] } 
                    } 
                },
                //
                { $set: 
                    { 'album.song.src': { 
                        $ifNull: [ '$album.song.src', { $convert: { input: '$album.song.id', to: 'string' } } ] } 
                    } 
                }
            ].concat(cond.pipelines);
            break;
    }

    next();
});
router.post('/find', (req, res) => {
    // cond: { type: 'forSongBlock' | 'custom', 
    // pipelines: [...] }
    const cond = req.body;
    // 
    const pipelines = cond.pipelines;

    Artist.aggregate([
        { $unwind: '$albums' },
        { $unwind: '$albums.songs' },
    ].concat(pipelines))
    .then(
    (songs) => res.json(suppFunc.getAnswer(songs)),     
    (err) => res.json(suppFunc.getError(err)));
});

module.exports = router