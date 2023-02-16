const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercasse: true,
    },

    password: {
        type: String,
        required: true
    },

    firstname: {
        type: String,
        required: true,
        trim: true
    },

    lastname: {
        type: String,
        required: true,
        trim: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    followers: [],
    following: []
},
    { timestamps: true }
);

module.exports = model('users', UserSchema);
