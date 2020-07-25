const Users = require('../models/Users');
const Topics = require('../models/Topics');
const jwt = require('jsonwebtoken');

function user_auth(req, res, next) {
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

function topics_auth(req, res, next) {
    Topics
        .findById(req.params.id)
        .then(doc => {
            if (doc == null)
                res
                    .status(400)
                    .send({ error: 'Topic doesn\'t exist' });

            else if (req.user_id.toString() !== doc.createdBy.toString())
                res
                    .status(403)
                    .send({ error: `Updating not allowed for user with id ${req.user_id}, only for ${doc.createdBy}` });
            else
                next();
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

module.exports = {
    user_auth,
    topics_auth
}