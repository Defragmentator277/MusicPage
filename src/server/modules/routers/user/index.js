const express = require('express');
const Types = require('mongoose').Types;
const User = require('../../../model/user');
//
const suppFunc = require('../../suppFunc');
// 
const router = express.Router();

//Authorization User
router.post('/findByNamePassword', (req, res) => {
    const cond = req.body
    //
    const username = cond.username;
    const password = cond.password;
    
    User.findOne({ username: username, password: password })
    .then(
    (user) => res.json(suppFunc.getAnswer(user)),
    (err) => res.json(suppFunc.getError(err)))
});
//
router.post('/findById', (req, res) => {
    const idUser = new Types.ObjectId(req.body.idUser);

    User.findById(idUser)
    .then(
    (ans) => res.json(suppFunc.getAnswer(ans)),
    (err) => res.json(suppFunc.getError(err)));
});
//
router.post('/findByIdExpanded', (req, res) => {
    const idUser = new Types.ObjectId(req.body.idUser);

    User.aggregate([
        { $match: { _id: idUser }},
        { $unwind: '$saved.songs'},
        { $lookup: {
            from: 'artist',
            localField: 'saved.artists',
            foreignField: '_id',
            as: 'saved.artists'
        }},
        { $lookup: {
            from: 'artist',
            localField: 'saved.songs.artist_id',
            foreignField: '_id',
            as: 'saved.songs.artist'
        }},
        { $unwind: '$saved.songs.artist'},
        { $unwind: '$saved.songs.artist.albums'},
        // { $unwind: '$saved.songs.artist.albums.songs'},

        // { $match: { 'saved.songs.album_id': "$saved.songs.artist.albums.songs.id" } }
        // { $unwind: '$saved.songs.artist.albums'},
        // { $lookup: {
        //     from: 'artist',
        //     localField: 'saved.albums.artist_id',
        //     foreignField: '_id',
        //     as: 'saved.albums.artist'
        // }},
        // { $group: { _id: '$_id' }}
        //////////
        // { $lookup: {
        //     from: 'artist',
        //     localField: 'saved.songs.artist_id',
        //     foreignField: '_id',
        //     as: 'saved.songs.artist.nested'
        // }},
        // { $lookup: {
        //     from: 'artist',
        //     localField: 'saved.playlists.songs.artist_id',
        //     foreignField: '_id',
        //     as: 'saved.playlists.songs.artist.nested'
        // }}
        ////////////
        // { $lookup: {
        //     from: 'artist',
        //     localField: 'saved.artists',
        //     foreignField: '_id',
        //     as: 'saved.artists'
        // }},
        // { $lookup: {
        //     from: 'artist',
        //     localField: 'saved.albums.id',
        //     foreignField: 'albums.id',
        //     as: 'saved.albums'
        // }},
        // { $lookup: {
        //     from: 'artist',
        //     localField: 'saved.songs.id',
        //     foreignField: 'albums.songs.id',
        //     as: 'saved.songs'
        // }},
        // { $lookup: {
        //     from: 'artist',
        //     localField: 'saved.playlists.songs.id',
        //     foreignField: 'albums.songs.id',
        //     as: 'saved.playlists.songs'
        // }}
    ])
    // User.findById(idUser)
    // .populate('saved.artists')
    // .populate('saved.albums.artist_id')
    // .populate('saved.songs.artist_id')
    // .populate('saved.playlists.songs.artist_id')
    .then(
    (ans) => res.json(suppFunc.getAnswer(ans)),
    (err) => res.json(suppFunc.getError(err)));

})

//Add song to favorite
router.post('/addFavoriteSong', (req, res) => {
    // cond: { idArtis: ..., idAlbum: ..., idSong: ..., idUser: ... }
    const cond = req.body;
    //
    const idArtist = new Types.ObjectId(cond.idArtist)
    const idAlbum = new Types.ObjectId(cond.idAlbum);
    const idSong = new Types.ObjectId(cond.idSong);
    // //
    const idUser = new Types.ObjectId(cond.idUser);

    User.findByIdAndUpdate(
        idUser, 
        { $push: { 'saved.songs': {
            artist_id: idArtist,
            album_id: idAlbum,  
            id: idSong
        } } }, 
        { returnDocument: 'after' })
    .then(
    (ans) => res.json(suppFunc.getAnswer(ans)),
    (err) => res.json(suppFunc.getError(err)));
})
//Delete song from favorite
router.post('/delFavoriteSong', (req, res) => {
    // cond: { idUser: ..., idSong: ... }
    const cond = req.body;
    //
    const idSong = new Types.ObjectId(cond.idSong);
    // //
    const idUser = new Types.ObjectId(cond.idUser);

    User.findByIdAndUpdate(
        idUser, 
        { $pull: { 'saved.songs': { id: idSong } } }, 
        { returnDocument: 'after' })
    .then(
    (ans) => res.json(suppFunc.getAnswer(ans)),
    (err) => res.json(suppFunc.getError(err)));

});

module.exports = router;