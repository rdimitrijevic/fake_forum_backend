const Users = require('../models/entities/users');
const Topics = require('../models/entities/topics');
const Posts = require('../models/entities/posts');
const utils = require('./auth_util');

function user_auth(req, res, next) {
    let decoded;
    try {
        decoded = utils
            .verify_token(req.get('X-jwt-token'));
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
        .then(topic => {
            if (topic == null)
                res
                    .status(400)
                    .send({ error: 'Topic doesn\'t exist' });

            else if (req.user_id.toString() !== topic.createdBy.toString())
                res
                    .status(403)
                    .send({ error: `Updating not allowed for user with id ${req.user_id}` });
            else
                next();
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}
function posts_auth(req, res, next) {
    Posts
        .findById(req.params.post_id)
        .then(post => {
            if (post == null)
                res
                    .status(400)
                    .send({ error: 'Post doesn\'t exist' });

            else if (req.user_id.toString() !== post.createdBy.toString())
                res
                    .status(403)
                    .send({ error: `Updating or deleting not allowed for user with id ${req.user_id}` });
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
    posts_auth,
    user_auth,
    topics_auth
}