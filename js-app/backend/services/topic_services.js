const Topics = require('../models/Topics')

/** 
 * @param {Topic creators id} id
 * @returns {Collection of topics if found, null otherwise}
 * @description Basic function for aquiring all topics 
 * created by a single user
 * 
*/
async function get_user_topics(id) {
    const user_id = id;
    let topics = null;
    
    try {
        topics = await Topics
                            .find({ creator: user_id });
    } catch (error) {
        console.log('In function user_services/get_user_topics:\n' + error);
    }

    return topics;
}

