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
        createdAt: 'createdAt'
    }
});

const Topics = mongoose.model('Topcis', topicSchema);

module.exports = Topics;