class PostResponse {
    post_id;
    topic_id;
    creator;
    content;

    constructor(post_id, topic_id, creator, content) {
        this.post_id = post_id;
        this.topic_id = topic_id;
        this.creator = creator;
        this.content = content;
    }
}

function Post(post_id, topic_id, creator, content) { return new PostResponse(post_id, topic_id, creator, content); }

module.exports = Post;