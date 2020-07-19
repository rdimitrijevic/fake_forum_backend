const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email:{
        type: mongoose.SchemaTypes.String,
        required: true
    },
    gender : {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['male', 'female']
    }
    
},
{
    timestamps: {
        createdAt: 'userCreated',
        updatedAt: 'userUpdated'
    }
});


const User = mongoose.model('Users', user, 'Users');

module.exports = User;