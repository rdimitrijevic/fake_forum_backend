const mongoose = require('mongoose');
const { usernameVal, passwordVal, emailVal } = require('./validators');
const { pass_hash } = require('./services');

const user = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        validate: usernameVal,
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

user.pre('save', function (next) {
    pass_hash(next, this);
});
const User = mongoose.model('Users', user, 'Users');

module.exports = User;