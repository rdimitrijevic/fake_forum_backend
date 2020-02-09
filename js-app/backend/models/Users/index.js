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
        validate: passwordVal
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

});

const User = mongoose.model('User', user);

module.exports = User;