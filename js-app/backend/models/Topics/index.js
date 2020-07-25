const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    title: {
        type: mongoose.SchemaTypes.String,
        minlength: 10,
        maxlength: 30
    }
},
{ 
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'lastPost'
    }
});

const Topics = mongoose.model('Topics', topicSchema, 'Topics');

module.exports = Topics;