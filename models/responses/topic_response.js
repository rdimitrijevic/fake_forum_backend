class TopicResponse {
    topic_id;
    title;
    creator;
    created;

    constructor(topic_id, title, creator, created) {
        this.topic_id = topic_id;
        this.title = title;
        this.creator = creator;
        this.created = created;
    }
}

function Topic(topic_id, title, creator, created) { return new TopicResponse(topic_id, title, creator, created); }

module.exports = Topic