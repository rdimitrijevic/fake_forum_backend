const Posts = require('../models/Posts')

/**
 * @param {Post owner id} id
 * @returns {Returns collection of posts if found, or null
 *  in every other case.}
*/
async function get_user_posts(id) {
    const user_id = id;
    let posts = null;

    try {
        posts = await Posts
                        .find({ creator: user_id });
    } catch (error) {
        console.log('In function user_services/get_user_posts:\n' + error);
    }

    return posts;
}
