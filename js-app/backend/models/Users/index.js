const mongoose = require('mongoose');
const { usernameVal, passwordVal, emailVal } = require('./validators');

const user = new mongoose.Schema({

    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: usernameVal
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: passwordVal,
    },
    email:{
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: emailVal
    },
    gender : {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['male', 'female']
    }
    
},
{
    timestamps: {
        createdAt: 'userCreated'
    }
});

const User = mongoose.model('Users', user);

module.exports = User;