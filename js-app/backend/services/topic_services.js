const Topics = require('../models/Topics')

/** 
 * @param {string} id - Topic creators id
 * @returns Collection of topics if found, null otherwise
 * @description Returns all topics of a single user
 * 
*/
async function get_by_user(id) {
    const user_id = id;
    let topics = null;
    
    try {
        topics = await Topics
                            .find({ creator: user_id });
    } catch (error) {
        console.log(`In function user_services/get_user_topics:\n ${error.message}`);
    }

    return topics;
}


async function create(new_topic) {
    const topic = new Topics(new_topic);
    let created = null;

    try {
        created = await topic.save();
    } catch(error) {
        console.log(`In function topic_services/create:\n ${error.message}`);
    }

    return created;
}


/**
 *@param {string} new_title - New title of the topic
 *@param {string} id - ID of the topic to be updated
 *@returns The modified record if successful, null otherwise
 *@description Updates a single record's title
 *  
*/
async function update(id,new_title) {
    let topic = null

    try {
        topic = await Topics.findOneAndUpdate(
            { _id: id },
            { title: new_title },
            { 
                new: true,
                useFindAndModify: false
            }
        );
    } catch (error) {
        console.log(`In function topic_services/update: \n${error.message}`);
    }

    return topic;
}