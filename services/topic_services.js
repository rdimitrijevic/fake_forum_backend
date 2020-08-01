const Topics = require('../models/entities/topics')
const Topic = require('../models/responses/topic_response')
/** 
 * @param {string} id - Topic creators id
 * @returns {Promise<TopicResponse[]>} Collection of topics if found, null otherwise
 * @description Returns all topics of a single user
 * 
*/
async function get_by_user(id) {
    const user_id = id;
    let topics = null;
    
    try {
        topics = await Topics
                            .find({ createdBy: user_id });
    } catch (error) {
        console.log(`In function user_services/get_user_topics:\n ${error.message}`);
        throw error;
    }

    return topics.map(topic => {
        return Topic(
            topic._id,
            topic.title,
            topic.createdBy,
            topic.createdAt
        );
    });
}

/**
 *
 * @param {Object} new_topic - Object representing the topic to be created
 * @returns {Promise<boolean|string>} New topic id if created
 * successfully, false otherwise
 */
async function create(new_topic) {
    const topic = new Topics(new_topic);
    let created = false;

    try {
        let _new = await topic.save();
        created = _new._id;
    } catch(error) {
        console.log(`In function topic_services/create:\n ${error.message}`);
        throw error;
    }

    return created;
}


/**
 *@param {string} new_title - New title of the topic
 *@param {string} id - ID of the topic to be updated
 *@returns {Promise<TopicResponse|null>} The modified record if successful, null otherwise
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
        throw error;
    }

    if(topic !== null)
        topic = Topic(
            topic._id,
            topic.title,
            topic.createdBy,
            topic.createdAt
        );

    return topic;
}

/**
 *
 * @returns {Promise<TopicResponse[]>} Promise containing collection of all
 * topics if found, null otherwise
 * @description Returns all records from the topics table
 */
async function get_all(){
    let topics = [];

    try{
        topics = await Topics.find({});
    }catch (error) {
        console.log(`In function topic_services/get_all: \n${error.message}`);
        throw error;
    }

    return topics.map(topic => {
        return Topic(
            topic._id,
            topic.title,
            topic.createdBy,
            topic.createdAt
        );
    });
}

module.exports = {
    get_by_user,
    get_all,
    update,
    create
}