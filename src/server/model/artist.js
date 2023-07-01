const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
// 
const ArtistSchema = new Schema({
    title: { type: String, require: true },
    src: { type: String }, //Обложка
    description: { type: String },
    year: { type: Number },
    likes: { type: Number },
    // 
    albums: [{
        id: { type: ObjectId },
        title: { type: String, require: true },
        year: { type: Number },
        src: { type: String }, //Обложка
        // 
        songs: [{
            id: { type: ObjectId },
            title: { type: String, require: true },
            src: { type: String }, //Ссылка на трек
            likes: { type: Number }
        }]
    }]
}, { collection: 'artist' });
// 
const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;