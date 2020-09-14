const Posts = require('../models/entities/posts');
const Post = require('../models/responses/post_response');

/**
 *
 * @param {string} id - Posts owners ID
 * @returns {Promise<PostResponse[]>} Returns collection of posts if found, and
 * an empty collection in every other case.
*/
async function get_by_user(id) {
    const user_id = id;
    let posts = [];

    try {
        posts = await Posts
            .find({ createdBy: user_id });
    } catch (error) {
        console.log('In function user_services/get_user_posts:\n' + error);
        throw error;
    }

    return posts.map(post => {
        return Post(
            post._id,
            post.parentTopic,
            post.createdBy,
            post.content,
            post.createdAt
        );
    });
}

/**
 *
 * @param {string} id - Post parent topics ID
 * @returns {Promise<PostResponse[]>} Returns collections of posts
 * on the requested topic.
 */
async function get_by_topic(id) {
    const topic_id = id;
    let posts = [];

    try {
        posts = await Posts
            .find({ parentTopic: topic_id });
    } catch (error) {
        console.log('In function user_services/get_by_topic:\n' + error);
        throw error;
    }

    return posts.map(post => {
        return Post(
            post._id,
            post.parentTopic,
            post.createdBy,
            post.content,
            post.createdAt
        );
    });
}

/**
 *
 * @param {Object} new_post - Object representing the post to be created
 * @returns {Promise<string|boolean>} - Returns new post id if successful,
 * false in every other case.
 */
async function create(new_post) {
    const post = new Posts(new_post);
    let created = false;

    try {
        let _new = await post.save();
        created = _new._id;
    } catch (error) {
        console.log(`In function topic_services/create:\n ${error.message}`);
        throw error;
    }

    return created;
}

/**
 *
 * @param {string} id - ID of the post to be updated
 * @param {string} new_content - New content of the post
 * @returns {Promise<PostResponse|null>} The modified record if successful, null otherwise
 */
async function update(id, new_content) {
    let post = null

    try {
        post = await Posts.findOneAndUpdate(
            { _id: id },
            { content: new_content },
            {
                new: true,
                useFindAndModify: false
            }
        );
    } catch (error) {
        console.log(`In function topic_services/update: \n${error.message}`);
        throw error;
    }

    if (post !== null)
        post = Post(
            post._id,
            post.parentTopic,
            post.createdBy,
            post.content,
            post.createdAt
        );

    return post;
}

/**
 *
 * @param post_id - ID of the post to be removed
 * @returns {Promise<string|null>} ID of the removed post, null otherwise
 */
async function remove(post_id) {
    let deleted = null;

    try {
        let removed_response = await Posts
            .deleteOne({ _id: post_id });

        if (removed_response.ok === 1)
            deleted = post_id;

    } catch (error) {
        console.log(`In function topic_services/remove: \n${error.message}`);
        throw error;
    }

    return deleted;
}


module.exports = {
    get_by_user,
    get_by_topic,
    create,
    update,
    remove
};