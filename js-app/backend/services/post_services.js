const Posts = require('../models/Posts')

/*
    The parameter user is a structure, containing
    either an _id field, or an username field,
    thus enabling querying user created posts by
    db _id or by the unique username.

    Returns collection of posts if found, or null
    if every other case.
*/
async function get_user_posts(user) {
    const user_id = user._id;
    let posts = null;

    try {
        await Posts
        .find({ creator: user_id });
    } catch (error) {
        console.log('In function user_services/get_user_posts:\n' + error);
    }

    return posts;
}
