const mongoose = require('mongoose');
const { titleVal } = require('./topics_validation');

const topicSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    title: {
        type: mongoose.SchemaTypes.String,
        minlength: 10,
        maxlength: 30,
        validate: titleVal
    }
},
{ 
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'lastPost'
    }
});

const Topics = mongoose.model('Topcis', topicSchema);

module.exports = Topics;