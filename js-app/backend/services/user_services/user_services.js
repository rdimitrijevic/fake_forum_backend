'use-strict';
const Users = require('../models/Users');
const Posts = require('../models/Posts');
const Topics = require('../models/Topics');

function return_user_id(user){
    let user_id = user._id;
    if( user._id == null){
        await Users.find({ username: user.username }).exec((err,res) => { if (!err) user_id = res._id });
    }

    return user_id;
}

/*
    The parameter user is a structure, containing
    either an _id field, or an username field,
    thus enabling querying user created posts by
    db _id or by the unique username.

    Returns collection of posts if found, or null
    if every other case.
*/
async function get_user_posts(user) {
    const user_id = return_user_id(user);
    let posts = null;

    try {
        await Posts.find({ creator: user_id }).exec((err, res) => { if (!err) posts = res });
    } catch (error) {
        console.log('In function user_services/get_user_posts:\n' + error);
    }

    return posts;
}

/*
    The parameter user is a structure, containing
    either an _id field, or an username field,
    thus enabling querying user created topics by db
    _id or by the unique username.

    Returns collection of topics if found, or null
    if every other case.
*/
async function get_user_topics(user) {
    const user_id = return_user_id(user);
    let topics = null;
    
    try {
        await Topics.find({ creator: user_id }).exec((err, res) => { if (!err) topics = res });
    } catch (error) {
        console.log('In function user_services/get_user_topics:\n' + error);
    }

    return topics;
}

async function get_user_related_topics(user) {
    const user_id = return_user_id(user);
    
}


module.exports = {
    get_user_posts,
    get_user_topics
};