const Users = require('../models/Users');
const jwt = require('jsonwebtoken');

function authorized(req, res, next) {
    let decoded;
    try {
        decoded = jwt.verify(
            req.get('X-jwt-token'),
            'skript2020'
        );
    } catch(error) {
        res
        .status(400)
        .send({ error: error.message });

        return;
    }

    Users.findById(decoded.id)
    .then(user => {
        if(user != null) {
            req.user_id = user._id;
            next();
        }
        else
            res
            .status(404)
            .send({ error: 'User not found' });
    })
    .catch(err => {
        res
        .status(400)
        .send({ 
            error: `Caught ${err.message}`,
            id: decoded.id
        });
    });
}

module.exports = {
    authorized
}