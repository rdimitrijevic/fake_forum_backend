const Topics = require('../models/Topics')

/*
    The parameter user is a structure, containing
    either an _id field, or an username field,
    thus enabling querying user created topics by db
    _id or by the unique username.

    Returns collection of topics if found, or null
    if every other case.
*/
async function get_user_topics(user) {
    const user_id = user._id;
    let topics = null;
    
    try {
        topics = await Topics
        .find({ creator: user_id });
    } catch (error) {
        console.log('In function user_services/get_user_topics:\n' + error);
    }

    return topics;
}

