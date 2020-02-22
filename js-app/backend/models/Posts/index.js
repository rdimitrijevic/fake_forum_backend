const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    parentTopic: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Topics'
    },
    content: {
        type: mongoose.SchemaTypes.String,
        required: true,
        maxlength: 128,
        minlength: 2
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Users'
    }
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts