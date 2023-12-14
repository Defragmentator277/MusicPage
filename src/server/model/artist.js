const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
// 
const ArtistSchema = new Schema({
    title: { type: String, required: true },
    src: { type: String }, //Обложка
    description: { type: String },
    year: { type: Number },
    likes: { type: Number },
    // 
    albums: [{
        id: { type: ObjectId, required: true },
        title: { type: String, required: true },
        year: { type: Number },
        likes: { type: Number },
        src: { type: String }, //Обложка
        // 
        songs: [{
            id: { type: ObjectId, required: true },
            title: { type: String, required: true },
            src: { type: String, required: true }, //Ссылка на трек
            likes: { type: Number },
            ext: { type: String, default: 'mp3' }
        }]
    }]
}, { collection: 'artist' });
// 
const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;