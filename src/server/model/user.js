const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// 
const UserSchema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true},
    name: { type: String },
}, { collection: 'user' });
// 
const User = mongoose.model('user', UserSchema);

module.exports = User;


