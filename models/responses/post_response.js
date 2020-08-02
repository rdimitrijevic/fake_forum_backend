class PostResponse {

    constructor(post_id, topic_id, creator, content, created) {
        this.post_id = post_id;
        this.topic_id = topic_id;
        this.creator = creator;
        this.content = content;
        this.created = created;
    }

}

function Post(post_id, topic_id, creator, content, created) {
    return new PostResponse(post_id, topic_id, creator, content, created);
}

module.exports = Post;