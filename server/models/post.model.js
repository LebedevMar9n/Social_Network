const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },

    desc: String,
    likes: [],
    image: String
},
    { timestamps: true }
);

module.exports = model('posts', PostSchema);
