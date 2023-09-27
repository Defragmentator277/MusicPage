const express = require('express');
const Artist = require('../../../model/artist');
const suppFunc = require('../../suppFunc');
//
const router = express.Router();

router.use('/', (req, res, next) => {
    const cond = req.body;

    switch(cond.type)
    {
        case 'forSongBlock':
            //Preparation for give info to songBlock
            cond.pipelines = [{ 
                $project: {
                    'description': 0, 
                    'year': 0,
                    'likes': 0,

                    'album.year': 0,
                }}
                //Rename albums to album, songs to song
            ]
            .concat(cond.pipelines);
            break;
    }

    next();
});
router.post('/find', (req, res) => {
    // cond: { type: 'forSongBlock' | 'custom', 
    // pipelines: [...] }
    const cond = req.body;
    // 
    const pipelines = cond.pipelines || [];

    Artist.aggregate([
        { $unwind: '$albums' },
        { $unwind: '$albums.songs' }
    ]
    .concat(suppFunc.renameToSingleAlbumsAndSongs())
    .concat(pipelines))
    //
    .then(
    (songs) => res.json(suppFunc.getAnswer(songs)),     
    (err) => res.json(suppFunc.getError(err)));
});

module.exports = router