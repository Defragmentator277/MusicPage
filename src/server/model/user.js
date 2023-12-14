const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
// 
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    name: { type: String },
    saved: {
        artists: [{ 
            id: { type: ObjectId, ref: 'artist', required: true, unique: true },//artist
        }],
        albums: [{ 
            id: { type: ObjectId, required: true, unique: true },//album

            artist_id: { type: ObjectId, ref: 'artist', required: true },
        }],
        songs: [{
            id: { type: ObjectId, required: true, unique: true },//song

            artist_id: { type: ObjectId, ref: 'artist', required: true }
        }],
        playlists: [{
            id: { type: ObjectId, required: true, unique: true },
            
            title: { type: String },
            songs: [{
                id: { type: ObjectId, required: true, unique: true },
    
                artist_id: { type: ObjectId, ref: 'artist', required: true },
                album_id: { type: ObjectId, required: true }
            }],
        }]
    }
}, { collection: 'user' });
// 
const User = mongoose.model('user', UserSchema);

module.exports = User;


